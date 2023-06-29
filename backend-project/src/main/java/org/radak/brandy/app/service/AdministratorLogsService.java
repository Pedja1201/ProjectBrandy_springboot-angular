package org.radak.brandy.app.service;

import org.radak.brandy.app.model.AdministratorLog;
import org.radak.brandy.app.repository.AdministratorLogsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdministratorLogsService {

    @Autowired
    private AdministratorLogsRepository administratorLogsRepository;

    public List<AdministratorLog> getAll(){
        return this.administratorLogsRepository.findAll();
    }

    public AdministratorLog save(AdministratorLog administratorLog) {
        return this.administratorLogsRepository.insert(administratorLog);
    }
}

