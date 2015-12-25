package com.geetion.tieba.service.impl;

import com.geetion.tieba.dao.AdminDAO;
import com.geetion.tieba.pojo.Admin;
import com.geetion.tieba.service.AdminService;
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
public class AdminServiceImpl implements AdminService {

    @Resource
    private AdminDAO adminDAO;

    @Override
    public Admin login(Admin object) {
        Admin admin = adminDAO.selectByAccount(object.getAccount());
        if (admin != null) {
            if (object.getPassword().equals(admin.getPassword())) {
//                adminDAO.update(admin);
                return admin;
            }
            admin.setPassword(null);
            return admin;
        }
        return null;
    }

    @Override
    public boolean register(Admin admin) {
        try {
            adminDAO.insert(admin);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean updateAdmin(Admin object) {
        return adminDAO.update(object) > 0;
    }

    @Override
    public Admin getAdminByAccount(String account) {
        return adminDAO.selectByAccount(account);
    }

    @Override
    public Admin getAdminByPK(Long id) {
        return adminDAO.selectPk(id);
    }

}
