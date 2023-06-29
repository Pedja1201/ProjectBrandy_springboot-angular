package org.radak.brandy.app.repository;

import org.radak.brandy.app.model.OrderShop;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends PagingAndSortingRepository<OrderShop, Long> {
}
