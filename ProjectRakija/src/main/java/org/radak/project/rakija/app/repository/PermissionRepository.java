package org.radak.project.rakija.app.repository;

import org.radak.project.rakija.app.model.Permission;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PermissionRepository extends CrudRepository<Permission, Long> {
}
