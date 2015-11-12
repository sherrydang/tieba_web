package com.geetion.drools.config;

import org.kie.api.io.ResourceType;
import org.springframework.context.annotation.*;

import com.technorage.demo.drools.DroolsResource;
import com.technorage.demo.drools.KieBuildException;
import com.technorage.demo.drools.ResourcePathType;
import com.technorage.demo.drools.spring.DefaultKieContainerBean;
import com.technorage.demo.drools.spring.DefaultKieServicesBean;
import com.technorage.demo.drools.spring.KieContainerBean;
import com.technorage.demo.drools.spring.KieServicesBean;

@Configuration
public class DroolsKieConfig {
    @Bean(name = "msgKieServices")
    public KieServicesBean msgServices() throws KieBuildException {
        DroolsResource[] resources = new DroolsResource[]{
                new DroolsResource("rules/msg-rules.drl", ResourcePathType.CLASSPATH, ResourceType.DRL)};
        KieServicesBean bean = new DefaultKieServicesBean(resources);
        return bean;
    }

    @Bean(name = "demoKieContainer")
    public KieContainerBean kieContainer(KieServicesBean kieServices) {
        KieContainerBean bean = new DefaultKieContainerBean(kieServices);
        return bean;
    }
}

