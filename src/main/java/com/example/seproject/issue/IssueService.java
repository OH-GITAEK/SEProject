package com.example.seproject.issue;

import java.nio.file.AccessDeniedException;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import com.example.seproject.member.dto.MemberDTO;
import com.example.seproject.member.entity.MemberEntity;
import com.example.seproject.member.repository.MemberRepository;
import com.example.seproject.member.service.MemberService;
import com.example.seproject.project.Project;
import com.example.seproject.project.ProjectRepository;
import com.example.seproject.project.ProjectService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class IssueService {
    private final IssueRepository issueRepository;
    private final ProjectRepository projectRepository;
    private final MemberService memberService;

    @Transactional
    public List<IssueForm> getList(Long projectId) {
        List<Issue> issues = issueRepository.findByProjectId(projectId);
        return issues.stream()
                .map(issue -> {
                    // 키워드 초기화
                    List<String> keyWords = issue.getKeyWords().stream().collect(Collectors.toList());
                    return IssueForm.builder()
                            .id(issue.getId())
                            .issueTitle(issue.getIssueTitle())
                            .issueDescription(issue.getIssueDescription())
                            .reporter(issue.getReporter().getMemberName())
                            .assignee(issue.getAssignee() != null ? issue.getAssignee().getMemberName() : null)
                            .status(issue.getStatus())
                            .keyWords(keyWords) // 키워드 추가
                            .build();
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public IssueForm getIssue(Long issueId) {
        Issue issue = issueRepository.findById(issueId).orElse(null);
        if (issue != null) {
            // 키워드 초기화
            List<String> keyWords = issue.getKeyWords().stream().collect(Collectors.toList());
            return IssueForm.builder()
                    .id(issue.getId())
                    .issueTitle(issue.getIssueTitle())
                    .issueDescription(issue.getIssueDescription())
                    .reporter(issue.getReporter().getMemberName())
                    .fixer(issue.getFixer() != null ? issue.getFixer().getMemberName() : null)
                    .assignee(issue.getAssignee() != null ? issue.getAssignee().getMemberName() : null)
                    .status(issue.getStatus())
                    .keyWords(keyWords) // 키워드 추가
                    .build();
        } else {
            return null;
        }
    }

    public IssueForm create(Long projectId, IssueForm issueForm){
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("이슈생성 실패! " +
                        "대상 프로젝트가 없습니다."));
        MemberEntity reporter = memberService.findByMemberName(issueForm.getReporter());

        boolean isTestUser = project.getTestUser().contains(reporter);
        if (!isTestUser) {
            try {
                throw new AccessDeniedException("Member is not authorized to create issues for this project");
            } catch (AccessDeniedException e) {
                throw new RuntimeException(e);
            }
        }
        Issue issue = Issue.createIssue(issueForm,project,reporter,null,null);
        Issue created = issueRepository.save(issue);

        return IssueForm.createIssueForm(created);
    }

    @Transactional
    public IssueForm updateDev(Long projectId, Long id,IssueForm issueForm, String myMemberName) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("이슈생성 실패! " +
                        "대상 프로젝트가 없습니다."));

        MemberEntity plUser = memberService.findByMemberName(myMemberName);

        boolean isPlUser = project.getPlUser().contains(plUser);
        if (!isPlUser) {
            try {
                throw new AccessDeniedException("Member is not authorized to create issues for this project");
            } catch (AccessDeniedException e) {
                throw new RuntimeException(e);
            }
        }
        MemberEntity assignee = memberService.findByMemberName(issueForm.getAssignee());
        Issue issue =   issueRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Issue not found"));
        issue.setStatus("assigned");
        issue.setAssignee(assignee);
        Issue created = issueRepository.save(issue);

        return IssueForm.createIssueForm(created);
    }

    public List<MemberDTO> recommendDevUsers(Long projectId, List<String> keyWords) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new IllegalArgumentException("Invalid project Id"));
        List<MemberEntity> devUsers = project.getDevUser();

        // 프로젝트 내 이슈 가져오기
        List<Issue> projectIssues = issueRepository.findByProjectId(projectId);

        // 키워드와 일치하는 이슈가 할당된 사용자 필터링
        Map<MemberEntity, Long> keywordMatchCount = devUsers.stream()
                .collect(Collectors.toMap(
                        user -> user,
                        user -> projectIssues.stream()
                                .filter(issue -> user.equals(issue.getAssignee()))
                                .flatMap(issue -> issue.getKeyWords().stream())
                                .filter(keyWords::contains)
                                .count()
                ));

        // 일치하는 키워드 수에 따라 사용자 정렬
        List<MemberEntity> recommendedUsers = keywordMatchCount.entrySet().stream()
                .filter(entry -> entry.getValue() > 0)
                .sorted(Map.Entry.<MemberEntity, Long>comparingByValue().reversed())
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());

        // 키워드와 일치하는 사용자가 없는 경우 이슈를 가장 많이 해결한 사용자 추가
        if (recommendedUsers.isEmpty()) {
            recommendedUsers.addAll(devUsers.stream()
                    .sorted(Comparator.comparingLong(user -> projectIssues.stream()
                                    .filter(issue -> user.equals(issue.getFixer())).count())
                            .reversed())
                    .toList());
        } else {
            // 이미 추천된 사용자 제외하고 이슈를 가장 많이 해결한 사용자 추가
            recommendedUsers.addAll(devUsers.stream()
                    .filter(user -> !recommendedUsers.contains(user))
                    .sorted(Comparator.comparingLong(user -> projectIssues.stream()
                                    .filter(issue -> user.equals(issue.getFixer())).count())
                            .reversed())
                    .toList());
        }

        // MemberEntity를 MemberDTO로 변환하여 반환
        return recommendedUsers.stream()
                .map(MemberDTO::toMemberDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public IssueForm update(Long projectId, Long id, IssueForm issueForm) {
        // 프로젝트가 존재하는지 확인
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid project Id"));

        // 이슈가 존재하는지 확인
        Issue issue = issueRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid issue Id"));

        // 이슈가 해당 프로젝트에 속하는지 확인
        if (!issue.getProject().getId().equals(projectId)) {
            throw new IllegalArgumentException("Issue does not belong to the specified project");
        }
        issue.setIssueTitle(issueForm.getIssueTitle());
        issue.setIssueDescription(issueForm.getIssueDescription());
        issue.setKeyWords(issueForm.getKeyWords());
        issue.setPriority(issueForm.getPriority());
        issue.setStatus(issueForm.getStatus());
        issueRepository.save(issue);

        return IssueForm.createIssueForm(issue);
    }
}
