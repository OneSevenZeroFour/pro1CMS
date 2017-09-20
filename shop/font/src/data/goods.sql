/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : node

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2017-09-20 16:24:15
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `good_id` int(100) NOT NULL AUTO_INCREMENT,
  `good_type` varchar(255) NOT NULL DEFAULT '',
  `gl_b_imgs` varchar(255) NOT NULL,
  `gl_s_imgs` varchar(255) NOT NULL,
  `gd_b_imgs` varchar(255) NOT NULL,
  `gd_s_imgs` varchar(255) NOT NULL,
  `price` double(10,0) NOT NULL,
  `old_price` double(10,0) DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  `sale_num` int(10) DEFAULT NULL,
  `last_num` int(10) DEFAULT NULL,
  `sizes` varchar(255) NOT NULL,
  `des` varchar(2555) DEFAULT NULL,
  PRIMARY KEY (`good_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('1', 'type1', 'gl_b_1.jpg', 'gl_s_1.jpg', 'good_1_big_1.jpg', 'good_1_small_1.jpg', '99', '139', 'Anta安踏 休闲鞋 男', '65', '12', '35、36、36.5、37', null);
INSERT INTO `goods` VALUES ('2', 'type1', 'gl_b_2.jpg', 'gl_s_2.jpg', 'good_1_big_2.jpg', 'good_1_small_2.jpg', '299', '345', 'VANS范斯 休闲鞋', '34', '7', '36.5、37、39.5、40', null);
INSERT INTO `goods` VALUES ('3', 'type1', 'gl_b_3.jpg', 'gl_s_3.jpg', 'good_1_big_3.jpg', 'good_1_small_4.jpg', '189', '223', 'CONVERSE匡威 帆布鞋 中性', '32', '34', '37、39.5、40、41.5、42', null);
INSERT INTO `goods` VALUES ('4', 'type1', 'gl_b_4.jpg', 'gl_s_4.jpg', 'good_1_big_4.jpg', 'good_1_small_4.jpg', '299', '345', 'DCdc 帆布鞋 中性', '87', '13', '36、36.5、37、39.5、40、41.5、42', null);
INSERT INTO `goods` VALUES ('5', 'type1', 'gl_b_5.jpg', 'gl_s_5.jpg', 'good_1_big_5.jpg', 'good_1_small_5.jpg', '278', '357', 'LINING李宁 休闲鞋', '97', '35', '35、36、36.5、37、39.5', null);
INSERT INTO `goods` VALUES ('6', 'type1', 'gl_b_6.jpg', 'gl_s_6.jpg', 'good_1_big_6.jpg', 'good_1_small_6.jpg', '267', '321', 'adidas阿迪达斯 休闲鞋 男', '12', '21', '36、36.5、37、39.5、40', null);
INSERT INTO `goods` VALUES ('7', 'type1', 'gl_b_7.jpg', 'gl_s_7.jpg', 'good_1_big_7.jpg', 'good_1_small_7.jpg', '245', '311', 'DCdc 帆布鞋 中性', '34', '22', '35、36、36.5、37、39.5', null);
INSERT INTO `goods` VALUES ('8', 'type1', 'gl_b_8.jpg', 'gl_s_8.jpg', 'good_1_big_8.jpg', 'good_1_small_8.jpg', '399', '425', 'VANS范斯 休闲鞋 女', '21', '12', '36.5、37、39.5、40、41.5、42', null);
INSERT INTO `goods` VALUES ('9', 'type1', 'gl_b_9.jpg', 'gl_s_9.jpg', 'good_1_big_9.jpg', 'good_1_small_9.jpg', '169', '232', 'CONVERSE匡威 帆布鞋 女', '78', '56', '36、36.5、37、39.5、40、41.5、42', null);
INSERT INTO `goods` VALUES ('10', 'type1', 'gl_b_10.jpg', 'gl_s_10.jpg', 'good_1_big_10.jpg', 'good_1_small_10.jpg', '233', '322', 'adidas阿迪达斯 凉鞋 女', '90', '100', '36、36.5、37、39.5、40、41.5', null);
INSERT INTO `goods` VALUES ('11', 'type1', 'gl_b_11.jpg', 'gl_s_11.jpg', 'good_1_big_11.jpg', 'good_1_small_11.jpg', '211', '344', 'Reebok锐步 休闲鞋 男', '21', '111', '36、36.5、37、39.5、40', null);
INSERT INTO `goods` VALUES ('12', 'type1', 'gl_b_12.jpg', 'gl_s_12.jpg', 'good_1_big_12.jpg', 'good_1_small_12.jpg', '289', '322', 'Anta安踏 板鞋 女', '23', '21', '35、36、36.5、37、39.5、40、41.5、42', null);
INSERT INTO `goods` VALUES ('13', 'type2', 'gl_2_b_1_1.jpg', 'gl_2_s_1_1.jpg', 'good_2_big_1.jpg', 'good_2_small_1.jpg', '199', '234', 'NIKE耐克 休闲鞋 男', '24', '12', '21、22、23.5、25、26、27', null);
INSERT INTO `goods` VALUES ('14', 'type2', 'gl_2_b_2.jpg', 'gl_2_b_2.jpg', 'good_2_big_2.jpg', 'good_2_big_2.jpg', '245', '312', 'NIKE耐克 休闲鞋 女', '45', '23', '21、22、23.5、25', null);
INSERT INTO `goods` VALUES ('15', 'type2', 'gl_2_b_3.jpg', 'gl_2_s_3.jpg', 'good_2_big_3.jpg', 'good_2_small_3.jpg', '134', '189', 'NIKE耐克 休闲鞋 男', '46', '12', '23.5、25、26、27', null);
INSERT INTO `goods` VALUES ('16', 'type2', 'gl_2_b_4.jpg', 'gl_2_s_4.jpg', 'good_2_big_4.jpg', 'good_2_small_4.jpg', '256', '311', 'NIKE耐克 休闲鞋 中性', '33', '67', '22、23.5、25、26、27', null);
INSERT INTO `goods` VALUES ('17', 'type2', 'gl_2_b_5.jpg', 'gl_2_s_5.jpg', 'good_2_big_5.jpg', 'good_2_small_5.jpg', '333', '345', 'NIKE耐克 休闲鞋 中性', '65', '11', '21、22、23.5', null);
INSERT INTO `goods` VALUES ('18', 'type3', 'gl_3_b_1.jpg', 'gl_3_s_1.jpg', 'good_3_big_1.jpg', 'good_3_small_1.jpg', '231', '288', 'adidas阿迪达斯 卫衣', '34', '23', '3XL、2XL、L', null);
INSERT INTO `goods` VALUES ('19', 'type3', 'gl_3_b_2.jpg', 'gl_3_s_2.jpg', 'good_3_big_2.jpg', 'good_3_small_2.jpg', '211', '234', 'LINING李宁 卫衣', '67', '34', '2XL、L、M、S、XL', null);
INSERT INTO `goods` VALUES ('20', 'type3', 'gl_3_b_3.jpg', 'gl_3_s_3.jpg', 'good_3_big_3.jpg', 'good_3_small_3.jpg', '256', '312', 'UMBRO茵宝 卫衣', '34', '22', '3XL、2XL、L', null);
INSERT INTO `goods` VALUES ('21', 'type3', 'gl_3_b_4.jpg', 'gl_3_s_4.jpg', 'good_3_big_4.jpg', 'good_3_small_4.jpg', '245', '345', 'CONVERSE匡威 卫衣', '44', '22', '3XL、2XL、L、M、S、XL', null);
INSERT INTO `goods` VALUES ('22', 'type3', 'gl_3_b_5.jpg', 'gl_3_s_5.jpg', 'good_3_big_5.jpg', 'good_3_small_5.jpg', '278', '456', 'adidas阿迪达斯 卫衣', '78', '23', '2XL、L、M、S、XL', null);
INSERT INTO `goods` VALUES ('23', 'type3', 'gl_3_b_6.jpg', 'gl_3_s_6.jpg', 'good_3_big_6.jpg', 'good_3_small_6.jpg', '273', '345', 'UMBRO茵宝 卫衣', '45', '11', '2XL、L、M、S、XL', null);
INSERT INTO `goods` VALUES ('24', 'type3', 'gl_3_b_7.jpg', 'gl_3_s_7.jpg', 'good_3_big_7.jpg', 'good_3_small_7.jpg', '123', '234', 'adidas阿迪达斯 卫衣', '34', '23', '3XL、2XL、L、M、S、XL', null);
INSERT INTO `goods` VALUES ('25', 'type3', 'gl_3_b_8.jpg', 'gl_3_s_8.jpg', 'good_3_big_8.jpg', 'good_3_small_8.jpg', '256', '345', 'CONVERSE匡威 卫衣', '66', '22', '2XL、L、M、S、XL', null);
INSERT INTO `goods` VALUES ('26', 'type3', 'gl_3_b_9.jpg', 'gl_3_s_9.jpg', 'good_3_big_9.jpg', 'good_3_small_9.jpg', '267', '378', 'adidas阿迪达斯 卫衣', '78', '34', '2XL、L、M、S、XL', null);
INSERT INTO `goods` VALUES ('27', 'type3', 'gl_3_b_10_1.jpg、gl_3_b_10_2.jpg、gl_3_b_10_3.jpg、gl_3_b_10_4.jpg、gl_3_b_10_5.jpg、gl_3_b_10_6.jpg', 'gl_3_s_10_1.jpg、gl_3_s_10_2.jpg、gl_3_s_10_3.jpg、gl_3_s_10_4.jpg、gl_3_s_10_5.jpg、gl_3_s_10_6.jpg', 'good_3_big_10.jpg', 'good_3_small_10.jpg', '278', '345', 'New BalanceNB 卫衣', '34', '22', '3XL、2XL、L、M、S、XL', null);
