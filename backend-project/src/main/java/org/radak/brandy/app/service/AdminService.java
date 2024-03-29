package org.radak.brandy.app.service;

import org.radak.brandy.app.model.Admin;
import org.radak.brandy.app.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;

    public Iterable<Admin> findAll() {
        return adminRepository.findAll();
    }

    public Page<Admin> findAll(Pageable pageable) {
        return adminRepository.findAll(pageable);
    }

    public Optional<Admin> findOne(Long id) {
        return adminRepository.findById(id);
    }

    public Admin save(Admin admin) { return adminRepository.save(admin); }

    public void delete(Long id) {
        adminRepository.deleteById(id);
    }

    public void delete(Admin admin) {
        adminRepository.delete(admin);
    }

    public Optional<Admin> findByUsername(String username) {
        return adminRepository.findByUsernameAdmin(username);
    }

    public boolean existsByUsername(String username) {
        return adminRepository.existsByUsername(username);
    }

    public boolean existsByEmail(String email) {
        return adminRepository.existsByEmail(email);
    }

    public boolean existsByUpin(String upin) {
        return adminRepository.existsByUpin(upin);
    }
}
