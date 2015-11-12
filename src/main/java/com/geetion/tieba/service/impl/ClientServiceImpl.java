package com.geetion.tieba.service.impl;

import com.geetion.tieba.dao.ClientDAO;
import com.geetion.tieba.pojo.Client;
import com.geetion.tieba.service.ClientService;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by xiang on 2015/6/17.
 */
@Service
@Scope(value = ConfigurableBeanFactory.SCOPE_SINGLETON, proxyMode = ScopedProxyMode.INTERFACES)
public class ClientServiceImpl implements ClientService {

    @Resource
    private ClientDAO clientDAO;

    @Override
    public Client login(Client object) {
        Client client = clientDAO.selectByAccount(object.getAccount());
        if (client != null) {
            if (object.getPassword().equals(client.getPassword())) {
//                clientDAO.update(client);
                return client;
            }
            client.setPassword(null);
            return client;
        }
        return null;
    }

    @Override
    public boolean register(Client client) {
        try {
            clientDAO.insert(client);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean updateClient(Client object) {
        return clientDAO.update(object) > 0;
    }

    @Override
    public Client getClientByAccount(String account) {
        return clientDAO.selectByAccount(account);
    }

    @Override
    public Client getClientByPK(Long id) {
        return clientDAO.selectPk(id);
    }

}
