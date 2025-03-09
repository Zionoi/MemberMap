package com.membermap.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "MEMBER")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // 회원 ID (PK)

    @Column(nullable = false)
    private String name;  // 회원 이름

    @Column(nullable = false)
    private Integer age;  // 회원 나이

    @Column(nullable = false)
    private String gender;  // 회원 성별 ("M" 또는 "F")

    @Column(nullable = false, unique = true)
    private String phoneNumber;  // 회원 전화번호 (고유값)

    @Column(nullable = false)
    private String address;  // 회원 주소

    // 회원(Member) 여러 명이 하나의 관리자(User)에게 속함 (N:1 관계 설정)
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)  // FK 설정
    private User user;
}
