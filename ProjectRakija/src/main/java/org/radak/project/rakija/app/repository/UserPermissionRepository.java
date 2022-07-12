package org.radak.project.rakija.app.repository;

import org.radak.project.rakija.app.model.UserPermission;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserPermissionRepository extends CrudRepository<UserPermission,Long> {
}
