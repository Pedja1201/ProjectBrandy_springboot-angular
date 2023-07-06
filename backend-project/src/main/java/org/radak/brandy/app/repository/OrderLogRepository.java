package org.radak.brandy.app.repository;

import org.radak.brandy.app.model.OrderLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderLogRepository extends MongoRepository<OrderLog, String> {
}
