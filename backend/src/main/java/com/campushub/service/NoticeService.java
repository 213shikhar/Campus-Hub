package com.campushub.service;

import com.campushub.model.Notice;
import com.campushub.repository.NoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@Service
public class NoticeService {

    @Autowired private NoticeRepository noticeRepository;

    public Notice uploadNotice(String title, String uploaderRole, MultipartFile file) throws IOException {
        Notice notice = new Notice();
        notice.setTitle(title);
        notice.setUploaderRole(uploaderRole); // Save who uploaded it
        notice.setFileName(file.getOriginalFilename());
        notice.setFileType(file.getContentType());
        notice.setData(file.getBytes());
        return noticeRepository.save(notice);
    }

    public List<Notice> getAllNotices() { return noticeRepository.findAll(); }

    public Notice getNoticeById(Long id) {
        return noticeRepository.findById(id).orElseThrow(() -> new RuntimeException("Notice not found"));
    }
}