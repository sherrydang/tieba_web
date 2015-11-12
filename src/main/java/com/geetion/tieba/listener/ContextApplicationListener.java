package com.geetion.tieba.listener;

import com.geetion.tieba.application.Application;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * Created by mac on 14/12/11.
 */
@Component
public class ContextApplicationListener implements ApplicationListener<ContextRefreshedEvent> {

    private static boolean isStart = false;

    @Resource
    private Application application;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        if (!isStart) {
            /**
             * 导入操作记录数据
             */
//            fileContentParser.initOperate();
            isStart = true;
            org.apache.ibatis.logging.LogFactory.useSlf4jLogging();


        }
    }
}
