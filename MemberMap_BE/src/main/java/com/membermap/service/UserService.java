package com.membermap.service;

import com.membermap.domain.User;
import com.membermap.domain.Member;
import com.membermap.repository.UserRepository;
import com.membermap.repository.MemberRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final MemberRepository memberRepository;

    public UserService(UserRepository userRepository, MemberRepository memberRepository) {
        this.userRepository = userRepository;
        this.memberRepository = memberRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(Long userId, User userDetails) {
        User user = getUserById(userId);
        user.setUsername(userDetails.getUsername());
        user.setPassword(userDetails.getPassword());
        user.setAddress(userDetails.getAddress());
        return userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    public List<Member> getMembersByUser(Long userId) {
        User user = getUserById(userId);
        return user.getMembers();
    }

    public Member addMemberToUser(Long userId, Member member) {
        User user = getUserById(userId);
        member.setUser(user);
        return memberRepository.save(member);
    }

    public Member updateMember(Long userId, Long memberId, Member memberDetails) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new RuntimeException("Member not found"));
        member.setName(memberDetails.getName());
        member.setAge(memberDetails.getAge());
        member.setGender(memberDetails.getGender());
        member.setPhoneNumber(memberDetails.getPhoneNumber());
        member.setAddress(memberDetails.getAddress());
        return memberRepository.save(member);
    }

    public void deleteMember(Long userId, Long memberId) {
        memberRepository.deleteById(memberId);
    }
}
