package org.radak.brandy.app.repository;

import org.radak.brandy.app.model.OrderShop;
import org.radak.brandy.app.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends PagingAndSortingRepository<OrderShop, Long> {

    @Query(value = "SELECT * FROM order_shop WHERE order_shop.customer_id = :customer_id", nativeQuery = true)
    Page<OrderShop> getOrderByUserId(@Param("customer_id") Long id, Pageable pageable);

    @Query(value = "SELECT * FROM order_shop WHERE order_shop.customer_id = :customer_id", nativeQuery = true)
    List<OrderShop> getPricesByUserId(@Param("customer_id") Long id);

    @Query(value = "SELECT order_shop.* FROM order_shop WHERE order_shop.brandy_id = :brandy_id", nativeQuery = true)
    List<OrderShop> getOrderByBrandyId(@Param("brandy_id") Long id);


}
