package com.example.seproject.issue;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;
import lombok.Builder;

@Getter
@Setter
@Builder
public class IssueForm {
    @NotEmpty(message="제목은 필수항목입니다.")
    @Size(max=200)
    private String issueTitle;

    @NotEmpty(message="내용은 필수항목입니다.")
    private String issueDescription;

    @Size(max=200)
    @Builder.Default
    private String priority = "major";

    @Size(max=200)
    @Builder.Default
    private String status = "new";


}
