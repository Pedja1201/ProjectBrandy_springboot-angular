package org.radak.brandy.app.repository;

import org.radak.brandy.app.model.AdministratorLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AdministratorLogsRepository extends MongoRepository<AdministratorLog, String> {
}

