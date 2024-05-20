package com.example.seproject.comment;

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
public class CommentController {
    private final CommentService commentService;

    @GetMapping("/api/projects/{projectId}/issues/{issueId}/comments")
    public List<CommentForm> list(@PathVariable("issueId") Long issueId){
        return commentService.getList(issueId);
    }

    @GetMapping("/api/projects/{projectId}/issues/{issueId}/comments/{id}")
    public CommentForm detail(@PathVariable("id") Long id){
        return commentService.getComment(id);
    }

    @PostMapping("/api/projects/{projectId}/issues/{issueId}/comments/create")
    public CommentForm create(@Valid @RequestBody CommentForm commentForm, BindingResult bindingResult, @PathVariable("issueId") Long issueId, HttpSession session){
        if (bindingResult.hasErrors()) {
            throw new ValidationException("Validation failed");
        }
        String myMemberName = (String)session.getAttribute("memberName");
        return commentService.create(issueId,commentForm,myMemberName);
    }
}
