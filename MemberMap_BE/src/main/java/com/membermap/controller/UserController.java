package com.membermap.controller;

import com.membermap.domain.User;
import com.membermap.domain.Member;
import com.membermap.service.UserService;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.membermap.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor  // Lombok이 자동으로 생성자 주입을 해줌!
public class UserController {
	
	private final UserService userService;

//	RequiredArgsConstructor어노테이션 사용으로 아래 코드 필요x
//	public UserController(UserService userService) { // 생성자를 통한 주입
//        this.userService = userService;
//    }
	
	/**
     * 모든 사용자(User) 조회
     */
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    /**
     * 특정 사용자(User) 조회
     */
    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }

    /**
     * 사용자(User) 생성
     */
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = userService.createUser(user);
        return ResponseEntity.ok(createdUser);
    }

    /**
     * 사용자(User) 정보 수정
     */
    @PutMapping("/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable Long userId, @RequestBody User userDetails) {
        User updatedUser = userService.updateUser(userId, userDetails);
        return ResponseEntity.ok(updatedUser);
    }

    /**
     * 사용자(User) 삭제
     */
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }

    /**
     * 특정 사용자의 회원(Member) 리스트 조회
     */
    @GetMapping("/{userId}/members")
    public ResponseEntity<List<Member>> getMembersByUser(@PathVariable Long userId) {
        List<Member> members = userService.getMembersByUser(userId);
        return ResponseEntity.ok(members);
    }

    /**
     * 특정 사용자에게 회원(Member) 추가
     */
    @PostMapping("/{userId}/members")
    public ResponseEntity<Member> addMemberToUser(@PathVariable Long userId, @RequestBody Member member) {
        Member addedMember = userService.addMemberToUser(userId, member);
        return ResponseEntity.ok(addedMember);
    }

    /**
     * 특정 사용자의 회원(Member) 정보 수정
     */
    @PutMapping("/{userId}/members/{memberId}")
    public ResponseEntity<Member> updateMember(@PathVariable Long userId, @PathVariable Long memberId, @RequestBody Member memberDetails) {
        Member updatedMember = userService.updateMember(userId, memberId, memberDetails);
        return ResponseEntity.ok(updatedMember);
    }

    /**
     * 특정 사용자의 회원(Member) 삭제
     */
    @DeleteMapping("/{userId}/members/{memberId}")
    public ResponseEntity<Void> deleteMember(@PathVariable Long userId, @PathVariable Long memberId) {
        userService.deleteMember(userId, memberId);
        return ResponseEntity.noContent().build();
    }
}

