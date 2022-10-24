package org.radak.project.rakija.app.service;

import org.radak.project.rakija.app.model.Permission;
import org.radak.project.rakija.app.repository.PermissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PermissionService {
    @Autowired
    private PermissionRepository permissionRepository;

    public Iterable<Permission> findAll() {
        return permissionRepository.findAll();
    }

    public Optional<Permission> findOne(Long id) {
        return permissionRepository.findById(id);
    }

    public Permission save(Permission permission) {
        return permissionRepository.save(permission);
    }

    public void delete(Long id) {
        permissionRepository.deleteById(id);
    }

    public void delete(Permission permission) {
        permissionRepository.delete(permission);
    }
}
