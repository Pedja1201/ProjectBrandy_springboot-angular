package org.radak.project.rakija.app.repository;

import org.radak.project.rakija.app.model.Kupac;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KupacRepository extends PagingAndSortingRepository<Kupac, Long> {
}
