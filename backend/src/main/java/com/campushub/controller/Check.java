package com.campushub.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Check {
	@GetMapping("/api/check")
	public String check() {
		return "This is CampusHub Backened";
	}
}
