package com.example.seproject.issue;

import com.example.seproject.project.ProjectService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class IssueController {
    private final IssueService issueService;

    @GetMapping("/api/projects/{projectId}/issues")
    public List<IssueForm> list(@PathVariable("projectId") Long projectId){
        return issueService.getList(projectId);
    }

    @GetMapping("/api/projects/{projectId}/issues/{id}")
    public IssueForm detail(@PathVariable("id") Long id){
        return issueService.getIssue(id);
    }

    @PostMapping("api/projects/{projectId}/issues/create")
    public IssueForm create(@Valid @RequestBody IssueForm issueForm, BindingResult bindingResult, @PathVariable("projectId") Long projectId, HttpSession session){
        if (bindingResult.hasErrors()) {
            throw new ValidationException("Validation failed");
        }
        String myMemberName = (String)session.getAttribute("memberName");
        issueForm.setReporter(myMemberName);
        issueForm.setProjectId(projectId);
        return issueService.create(projectId,issueForm);
    }

    @PostMapping("api/projects/{projectId}/issues/{id}/update-dev")
    public IssueForm updateDev(@Valid @RequestBody IssueForm issueForm, BindingResult bindingResult, @PathVariable("id") Long id,@PathVariable("projectId") Long projectId, HttpSession session){
        if (bindingResult.hasErrors()) {
            throw new ValidationException("Validation failed");
        }
        String myMemberName = (String)session.getAttribute("memberName");
        return issueService.updateDev(projectId,id,issueForm,myMemberName);
    }

}
