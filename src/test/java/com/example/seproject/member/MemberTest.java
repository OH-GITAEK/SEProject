package com.example.seproject.member;

import com.example.seproject.member.dto.MemberDTO;
import com.example.seproject.member.entity.MemberEntity;
import com.example.seproject.member.repository.MemberRepository;
import com.example.seproject.member.service.MemberService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class MemberTest {

    @Mock
    private MemberRepository memberRepository;

    @InjectMocks
    private MemberService memberService;

    private MemberEntity memberEntity;
    private MemberDTO memberDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        memberEntity = new MemberEntity();
        memberEntity.setId(1L);
        memberEntity.setMemberName("testName");
        memberEntity.setMemberEmail("testEmail@example.com");
        memberEntity.setMemberPassword("testPassword");

        memberDTO = new MemberDTO();
        memberDTO.setId(1L);
        memberDTO.setMemberName("testName");
        memberDTO.setMemberEmail("testEmail@example.com");
        memberDTO.setMemberPassword("testPassword");
    }

    @Test
    void testSave() {
        memberService.save(memberDTO);

        verify(memberRepository, times(1)).save(any(MemberEntity.class));
    }

    @Test
    void testLoginSuccess() {
        when(memberRepository.findByMemberEmail(memberDTO.getMemberEmail())).thenReturn(Optional.of(memberEntity));

        MemberDTO loggedInMember = memberService.login(memberDTO);

        assertNotNull(loggedInMember);
        assertEquals(memberDTO.getMemberEmail(), loggedInMember.getMemberEmail());
    }

    @Test
    void testLoginFailureWrongPassword() {
        memberDTO.setMemberPassword("wrongPassword");
        when(memberRepository.findByMemberEmail(memberDTO.getMemberEmail())).thenReturn(Optional.of(memberEntity));

        MemberDTO loggedInMember = memberService.login(memberDTO);

        assertNull(loggedInMember);
    }

    @Test
    void testLoginFailureNoSuchMember() {
        when(memberRepository.findByMemberEmail(memberDTO.getMemberEmail())).thenReturn(Optional.empty());

        MemberDTO loggedInMember = memberService.login(memberDTO);

        assertNull(loggedInMember);
    }

    @Test
    void testFindAll() {
        List<MemberEntity> members = new ArrayList<>();
        members.add(memberEntity);

        when(memberRepository.findAll()).thenReturn(members);

        List<MemberDTO> memberDTOList = memberService.findAll();

        assertEquals(1, memberDTOList.size());
        assertEquals(memberEntity.getMemberEmail(), memberDTOList.get(0).getMemberEmail());
    }

    @Test
    void testFindById() {
        when(memberRepository.findById(1L)).thenReturn(Optional.of(memberEntity));

        MemberDTO foundMember = memberService.findById(1L);

        assertNotNull(foundMember);
        assertEquals(memberEntity.getMemberEmail(), foundMember.getMemberEmail());
    }

    @Test
    void testUpdateForm() {
        when(memberRepository.findByMemberName("testName")).thenReturn(Optional.of(memberEntity));

        MemberDTO foundMember = memberService.updateForm("testName");

        assertNotNull(foundMember);
        assertEquals(memberEntity.getMemberName(), foundMember.getMemberName());
    }

    @Test
    void testUpdate() {
        memberService.update(memberDTO);

        verify(memberRepository, times(1)).save(any(MemberEntity.class));
    }

    @Test
    void testDeleteById() {
        memberService.deleteById(1L);

        verify(memberRepository, times(1)).deleteById(1L);
    }

    @Test
    void testFindByMemberName() {
        when(memberRepository.findByMemberName("testName")).thenReturn(Optional.of(memberEntity));

        MemberEntity foundMember = memberService.findByMemberName("testName");

        assertNotNull(foundMember);
        assertEquals(memberEntity.getMemberName(), foundMember.getMemberName());
    }

    @Test
    void testFindByMemberNameNotFound() {
        when(memberRepository.findByMemberName("testName")).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> memberService.findByMemberName("testName"));
    }
}
