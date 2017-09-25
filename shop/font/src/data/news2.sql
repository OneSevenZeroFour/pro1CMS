/*
Navicat MySQL Data Transfer

Source Server         : rm-wz9w4v621xko71doxo.mysql.rds.aliyuncs.com_3306
Source Server Version : 50715
Source Host           : rm-wz9w4v621xko71doxo.mysql.rds.aliyuncs.com:3306
Source Database       : cms

Target Server Type    : MYSQL
Target Server Version : 50715
File Encoding         : 65001

Date: 2017-09-25 14:01:03
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` int(5) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `message` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL COMMENT '已读未读状态',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '接收信息时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
