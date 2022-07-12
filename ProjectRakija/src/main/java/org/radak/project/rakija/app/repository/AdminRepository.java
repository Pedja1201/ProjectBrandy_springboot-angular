package org.radak.project.rakija.app.repository;

import org.radak.project.rakija.app.model.Admin;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends PagingAndSortingRepository<Admin, Long> {
}
