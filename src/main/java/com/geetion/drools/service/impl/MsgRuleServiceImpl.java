package com.geetion.drools.service.impl;

import com.geetion.drools.service.MsgRuleService;
import com.technorage.demo.drools.monitoring.TrackingAgendaEventListener;
import com.technorage.demo.drools.monitoring.TrackingWorkingMemoryEventListener;
import com.technorage.demo.drools.spring.DefaultKieSessionBean;
import com.technorage.demo.drools.spring.KieContainerBean;
import com.technorage.demo.drools.spring.KieServicesBean;
import com.technorage.demo.drools.spring.KieSessionBean;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Service;

import java.io.Serializable;

/**
 * Created by virgilyan on 12/8/14.
 */
//@Service
//@Scope(value = ConfigurableBeanFactory.SCOPE_SINGLETON, proxyMode = ScopedProxyMode.INTERFACES)
public class MsgRuleServiceImpl implements MsgRuleService, Serializable {

    private static Logger log = LoggerFactory.getLogger(MsgRuleServiceImpl.class);

    public KieSessionBean kieSession;

    private TrackingAgendaEventListener agendaEventListener;
    private TrackingWorkingMemoryEventListener workingMemoryEventListener;

    @Autowired
    public MsgRuleServiceImpl(
            @Qualifier("demoKieContainer") KieContainerBean kieContainer,
            @Qualifier("msgKieServices") KieServicesBean kieServices) {

        kieSession = new DefaultKieSessionBean(kieServices, kieContainer);

        agendaEventListener = new TrackingAgendaEventListener();
        workingMemoryEventListener = new TrackingWorkingMemoryEventListener();

        kieSession.addEventListener(agendaEventListener);
        kieSession.addEventListener(workingMemoryEventListener);
    }

    @Override
    public boolean validateCaptcha(String code, String input) {
        return false;
    }
}
