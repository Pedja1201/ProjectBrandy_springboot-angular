package org.radak.project.rakija.app.repository;

import org.radak.project.rakija.app.model.Porudzbina;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PorudzbinaRepository extends PagingAndSortingRepository<Porudzbina, Long> {
}
