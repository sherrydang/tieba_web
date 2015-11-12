CREATE DATABASE  IF NOT EXISTS `advertisement` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `advertisement`;
-- MySQL dump 10.13  Distrib 5.6.19, for osx10.7 (i386)
--
-- Host: www.geetion.com    Database: advertisement
-- ------------------------------------------------------
-- Server version	5.6.12-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `account` varchar(50) DEFAULT NULL COMMENT '账号',
  `password` varchar(50) DEFAULT NULL COMMENT '登录密码',
  `gender` varchar(1) DEFAULT NULL COMMENT '性别',
  `position` varchar(20) DEFAULT NULL COMMENT '职位',
  `phone` varchar(20) DEFAULT NULL COMMENT '电话',
  `email` varchar(30) DEFAULT NULL COMMENT '电子邮件',
  `enterprise_id` bigint(20) DEFAULT NULL COMMENT '企业ID',
  `freeze` smallint(11) DEFAULT NULL COMMENT '是否冻结',
  `type` smallint(11) DEFAULT NULL COMMENT '管理员类型，0：平台管理员 1：企业管理员',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `FK_ADMIN_REF_ENTERPRISE` (`enterprise_id`),
  CONSTRAINT `FK_ADMIN_REF_ENTERPRISE` FOREIGN KEY (`enterprise_id`) REFERENCES `enterprise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `advertisement`
--

DROP TABLE IF EXISTS `advertisement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `advertisement` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `account` varchar(30) DEFAULT NULL COMMENT '公众号',
  `introduction` varchar(255) DEFAULT NULL COMMENT '公众号介绍',
  `name` varchar(30) DEFAULT NULL COMMENT '广告名称',
  `title` varchar(50) DEFAULT NULL COMMENT '广告标题',
  `link` varchar(200) DEFAULT NULL COMMENT '广告链接',
  `image` bigint(20) DEFAULT NULL COMMENT '广告图片/公众号头像',
  `price` double(10,0) DEFAULT NULL COMMENT '单条价格',
  `amount` bigint(20) DEFAULT NULL COMMENT '投放量',
  `expired_time` datetime DEFAULT NULL COMMENT '广告过期时间',
  `admin_id` bigint(20) DEFAULT NULL COMMENT '发布人ID',
  `enterprise_id` bigint(20) DEFAULT NULL COMMENT '发布企业ID',
  `type` smallint(11) DEFAULT NULL COMMENT '广告类型，0：微信/易信朋友圈，1：微信/易信关注，2：QQ空间/微博发布',
  `condition_id` bigint(20) DEFAULT NULL COMMENT '定向投放条件ID',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `FK_AD_REF_ENTERPRISE` (`enterprise_id`),
  KEY `FK_AD_REF_CONDITION` (`condition_id`),
  KEY `FK_AD_REF_ADMIN` (`admin_id`),
  KEY `FK_AD_REF_IMAGE` (`image`),
  CONSTRAINT `FK_AD_REF_ADMIN` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_AD_REF_CONDITION` FOREIGN KEY (`condition_id`) REFERENCES `advertisement_condition` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_AD_REF_ENTERPRISE` FOREIGN KEY (`enterprise_id`) REFERENCES `enterprise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_AD_REF_IMAGE` FOREIGN KEY (`image`) REFERENCES `image` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `advertisement_condition`
--

DROP TABLE IF EXISTS `advertisement_condition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `advertisement_condition` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `advertisement_id` bigint(20) DEFAULT NULL COMMENT '广告ID',
  `pid` int(11) DEFAULT '1' COMMENT '省份ID',
  `cid` int(11) DEFAULT '0' COMMENT '城市ID',
  `gender` varchar(1) DEFAULT NULL COMMENT '性别，M:男，F:女',
  `age_from` int(11) DEFAULT NULL COMMENT '开始年龄',
  `age_to` int(11) DEFAULT NULL COMMENT '结束年龄',
  PRIMARY KEY (`id`),
  KEY `FK_CONDITION_REF_AD` (`advertisement_id`),
  KEY `FK_CONDITION_REF_PROVINCE` (`pid`),
  KEY `FK_CONDITION_REF_CITY` (`cid`),
  CONSTRAINT `FK_CONDITION_REF_AD` FOREIGN KEY (`advertisement_id`) REFERENCES `advertisement` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_CONDITION_REF_CITY` FOREIGN KEY (`cid`) REFERENCES `city` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_CONDITION_REF_PROVINCE` FOREIGN KEY (`pid`) REFERENCES `province` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `announcement`
--

DROP TABLE IF EXISTS `announcement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `announcement` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '公告ID',
  `pid` int(11) DEFAULT '1' COMMENT '省份ID',
  `cid` int(11) DEFAULT '0' COMMENT '城市ID',
  `title` varchar(100) DEFAULT NULL COMMENT '公告标题',
  `content` varchar(300) DEFAULT NULL COMMENT '公告内容',
  `type` int(11) DEFAULT NULL COMMENT '公告类型，0：即时推送，1：延时推送',
  `admin_id` bigint(20) DEFAULT NULL COMMENT '发布人ID',
  `create_time` timestamp NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `FK_ANNOUNCEMENT_REF_ADMIN` (`admin_id`),
  KEY `FK_ANNOUNCEMENT_REF_PROVINCE` (`pid`),
  KEY `FK_ANNOUNCEMENT` (`cid`),
  CONSTRAINT `FK_ANNOUNCEMENT` FOREIGN KEY (`cid`) REFERENCES `city` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ANNOUNCEMENT_REF_ADMIN` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ANNOUNCEMENT_REF_PROVINCE` FOREIGN KEY (`pid`) REFERENCES `province` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `announcement_pic`
--

DROP TABLE IF EXISTS `announcement_pic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `announcement_pic` (
  `id` smallint(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `image1` varchar(100) DEFAULT NULL COMMENT '广告栏图片1',
  `image2` varchar(100) DEFAULT NULL COMMENT '广告栏图片2',
  `image3` varchar(100) DEFAULT NULL COMMENT '广告栏图片3',
  `admin_id` bigint(20) DEFAULT NULL COMMENT '更新人',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `FK_PIC_REF_ADMIN` (`admin_id`),
  CONSTRAINT `FK_PIC_REF_ADMIN` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bill_limit`
--

DROP TABLE IF EXISTS `bill_limit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bill_limit` (
  `id` smallint(6) NOT NULL COMMENT '主键',
  `admin_id` bigint(20) DEFAULT NULL COMMENT '更新人',
  `low` double DEFAULT NULL COMMENT '下限',
  `hight` double DEFAULT NULL COMMENT '上限',
  `update_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `FK_LIMIT_REF_ADMIN` (`admin_id`),
  CONSTRAINT `FK_LIMIT_REF_ADMIN` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bind_account`
--

DROP TABLE IF EXISTS `bind_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bind_account` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` bigint(20) DEFAULT NULL COMMENT '用户ID',
  `weixin` varchar(30) DEFAULT NULL COMMENT '微信账号',
  `weixin_create` timestamp NULL DEFAULT NULL COMMENT '微信绑定日期',
  `yixin` varchar(30) DEFAULT NULL COMMENT '易信账号',
  `yixin_create` timestamp NULL DEFAULT NULL COMMENT '易信绑定日期',
  `weibo` varchar(30) DEFAULT NULL COMMENT '微博账号',
  `weibo_create` timestamp NULL DEFAULT NULL COMMENT '微博绑定日期',
  `qq` varchar(30) DEFAULT NULL COMMENT 'QQ账号',
  `qq_create` timestamp NULL DEFAULT NULL COMMENT 'QQ绑定日期',
  PRIMARY KEY (`id`),
  KEY `FK_RECORD_REF_USER` (`user_id`),
  CONSTRAINT `FK_RECORD_REF_USER` FOREIGN KEY (`user_id`) REFERENCES `client` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `city` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_bin NOT NULL,
  `pid` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1654 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `client` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `account` varchar(20) DEFAULT NULL COMMENT '账号，即手机号',
  `password` varchar(30) DEFAULT NULL COMMENT '密码',
  `head` bigint(20) DEFAULT '0' COMMENT '头像ID',
  `real_name` varchar(30) DEFAULT NULL COMMENT '真实姓名',
  `gender` varchar(1) DEFAULT NULL COMMENT '性别',
  `birthday` date DEFAULT NULL COMMENT '生日',
  `province_id` int(11) DEFAULT '1' COMMENT '省份ID',
  `city_id` int(11) DEFAULT '0' COMMENT '城市ID',
  `job` smallint(20) DEFAULT NULL COMMENT '职业，0：在职，1：学生',
  `identifier` varchar(5) DEFAULT NULL COMMENT '企业识别码',
  `department_id` bigint(20) DEFAULT NULL COMMENT '部门',
  `balance` double DEFAULT '0' COMMENT '用户余额',
  `token` varchar(32) DEFAULT NULL COMMENT '登录token',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建日期',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UN_ACCOUNT` (`account`),
  KEY `FK_USER_REF_IDENTIFIER` (`identifier`),
  KEY `FK_USER_REF_CITY` (`city_id`),
  KEY `FK_USER_REF_PROVINCE` (`province_id`),
  KEY `FK_USER_REF_IMAGE` (`head`),
  CONSTRAINT `FK_USER_REF_CITY` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_USER_REF_IDENTIFIER` FOREIGN KEY (`identifier`) REFERENCES `enterprise` (`identifier`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_USER_REF_IMAGE` FOREIGN KEY (`head`) REFERENCES `image` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_USER_REF_PROVINCE` FOREIGN KEY (`province_id`) REFERENCES `province` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `department` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `enterprise_id` bigint(20) DEFAULT NULL COMMENT '企业ID',
  `name` varchar(30) DEFAULT NULL COMMENT '部门名称',
  PRIMARY KEY (`id`),
  KEY `FK_DEPT_REF_ENTERPRISE` (`enterprise_id`),
  CONSTRAINT `FK_DEPT_REF_ENTERPRISE` FOREIGN KEY (`enterprise_id`) REFERENCES `enterprise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `enterprise`
--

DROP TABLE IF EXISTS `enterprise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `enterprise` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `simple_name` varchar(20) DEFAULT NULL COMMENT '企业简称',
  `full_name` varchar(50) DEFAULT NULL COMMENT '企业全称',
  `identifier` varchar(5) DEFAULT NULL COMMENT '企业识别码',
  `pid` int(11) DEFAULT '1' COMMENT '省份ID',
  `cid` int(11) DEFAULT '0' COMMENT '城市ID',
  `location` varchar(50) DEFAULT NULL COMMENT '地址',
  `phone` varchar(20) DEFAULT NULL COMMENT '电话',
  `balance` double(10,0) unsigned DEFAULT NULL COMMENT '余额',
  `parent` bigint(20) DEFAULT NULL COMMENT '父企业/平台',
  `platform` smallint(11) DEFAULT NULL COMMENT '是否为平台',
  `freeze` smallint(11) DEFAULT NULL COMMENT '是否冻结',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `identifier` (`identifier`),
  KEY `FK_ENTERPRISE_REF_PARENT` (`parent`),
  KEY `FK_ENTERPRISE_REF_CITY` (`cid`),
  KEY `FK_ENTERPRISE_REF_PROVINCE` (`pid`),
  CONSTRAINT `FK_ENTERPRISE_REF_CITY` FOREIGN KEY (`cid`) REFERENCES `city` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ENTERPRISE_REF_PARENT` FOREIGN KEY (`parent`) REFERENCES `enterprise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ENTERPRISE_REF_PROVINCE` FOREIGN KEY (`pid`) REFERENCES `province` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `enterprise_income`
--

DROP TABLE IF EXISTS `enterprise_income`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `enterprise_income` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `enterprise_id` bigint(20) DEFAULT NULL COMMENT '企业ID',
  `admin_id` bigint(20) DEFAULT NULL COMMENT '操作人ID',
  `amount` double(10,0) unsigned DEFAULT NULL COMMENT '数目',
  `introduction` varchar(50) DEFAULT NULL COMMENT '收入介绍',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `FK_INCOME_REF_ENTERPRISE` (`enterprise_id`),
  KEY `FK_INCOME_REF_ADMIN` (`admin_id`),
  CONSTRAINT `FK_INCOME_REF_ADMIN` FOREIGN KEY (`admin_id`) REFERENCES `enterprise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_INCOME_REF_ENTERPRISE` FOREIGN KEY (`enterprise_id`) REFERENCES `enterprise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `enterprise_pay`
--

DROP TABLE IF EXISTS `enterprise_pay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `enterprise_pay` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `enterprise_id` bigint(20) DEFAULT NULL COMMENT '企业ID',
  `admin_id` bigint(20) DEFAULT NULL COMMENT '操作人ID',
  `user_bill_id` bigint(20) DEFAULT NULL COMMENT '用户账单ID',
  `amount` double(10,0) unsigned DEFAULT NULL COMMENT '数目',
  `introduction` varchar(50) DEFAULT NULL COMMENT '支出介绍',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `FK_PAY_REF_ENTERPRISE` (`enterprise_id`),
  KEY `FK_PAY_REF_ADMIN` (`admin_id`),
  KEY `FK_PAY_REF_USER_BILL` (`user_bill_id`),
  CONSTRAINT `FK_PAY_REF_ADMIN` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_PAY_REF_ENTERPRISE` FOREIGN KEY (`enterprise_id`) REFERENCES `enterprise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_PAY_REF_USER_BILL` FOREIGN KEY (`user_bill_id`) REFERENCES `user_bill` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `image` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `url` varchar(100) DEFAULT NULL COMMENT '图片URL',
  `type` int(11) DEFAULT NULL COMMENT '图片类型，0：广告图片，:1：头像图片，2：截图图片',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `operation`
--

DROP TABLE IF EXISTS `operation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `operation` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` bigint(20) DEFAULT NULL COMMENT '操作用户ID',
  `type` int(11) DEFAULT NULL COMMENT '用户类型，0 管理员， 1 普通用户',
  `event` bigint(20) DEFAULT NULL COMMENT '操作事件',
  `operate_time` datetime DEFAULT NULL COMMENT '操作时间',
  PRIMARY KEY (`id`),
  KEY `FK_OPERATION_REF_EVENT` (`event`),
  CONSTRAINT `FK_OPERATION_REF_EVENT` FOREIGN KEY (`event`) REFERENCES `operation_event` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `operation_event`
--

DROP TABLE IF EXISTS `operation_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `operation_event` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '操作事件ID',
  `name` varchar(50) DEFAULT NULL COMMENT '操作时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `province`
--

DROP TABLE IF EXISTS `province`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `province` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_bin NOT NULL,
  `level` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `task` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` bigint(20) DEFAULT NULL COMMENT '用户ID',
  `advertisement_id` bigint(20) DEFAULT NULL COMMENT '广告ID',
  `image` bigint(20) DEFAULT NULL COMMENT '截图',
  `status` int(11) DEFAULT NULL COMMENT '任务状态，0：待完成，1：待审核，2：已完成，3：被拒绝',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `FK_TASK_REF_AD` (`advertisement_id`),
  KEY `FK_TASK_REF_USER` (`user_id`),
  KEY `FK_TASK_REF_IMAGE` (`image`),
  CONSTRAINT `FK_TASK_REF_AD` FOREIGN KEY (`advertisement_id`) REFERENCES `advertisement` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_TASK_REF_IMAGE` FOREIGN KEY (`image`) REFERENCES `image` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_TASK_REF_USER` FOREIGN KEY (`user_id`) REFERENCES `client` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `task_rejection`
--

DROP TABLE IF EXISTS `task_rejection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `task_rejection` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `task_id` bigint(20) DEFAULT NULL,
  `reason` varchar(100) DEFAULT NULL,
  `reject_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_REJECT_REF_TASK` (`task_id`),
  CONSTRAINT `FK_REJECT_REF_TASK` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_alipay`
--

DROP TABLE IF EXISTS `user_alipay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_alipay` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` bigint(20) DEFAULT NULL COMMENT '用户ID',
  `alipay` varchar(50) DEFAULT NULL COMMENT '支付宝账号',
  `real_name` varchar(50) DEFAULT NULL COMMENT '支付宝真实姓名',
  `bind_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '绑定日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_bill`
--

DROP TABLE IF EXISTS `user_bill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_bill` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` bigint(20) DEFAULT NULL COMMENT '用户ID',
  `amount` double(10,0) unsigned DEFAULT NULL COMMENT '数目',
  `type` smallint(6) DEFAULT NULL COMMENT '类型，0：收入，1：支出',
  `status` int(11) DEFAULT NULL COMMENT '提现状态，0：提现中，1：提现完成，2：提现失败',
  `rejection` varchar(100) DEFAULT NULL COMMENT '提现失败理由',
  `request_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '申请提现时间',
  PRIMARY KEY (`id`),
  KEY `FK_BILL_REF_USER` (`user_id`),
  CONSTRAINT `FK_BILL_REF_USER` FOREIGN KEY (`user_id`) REFERENCES `client` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-06-23 11:19:21
