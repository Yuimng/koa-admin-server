/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 80036
 Source Host           : localhost:3306
 Source Schema         : ym_admin_test

 Target Server Type    : MySQL
 Target Server Version : 80036
 File Encoding         : 65001

 Date: 22/10/2024 23:03:49
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_department
-- ----------------------------
DROP TABLE IF EXISTS `sys_department`;
CREATE TABLE `sys_department`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `parent_id` int NOT NULL DEFAULT 0,
  `sort` int NULL DEFAULT NULL,
  `is_enable` tinyint NULL DEFAULT 1,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  `deleted_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_department
-- ----------------------------
INSERT INTO `sys_department` VALUES (1, 'YM科技', 0, 1, 1, '2024-10-22 22:29:15', '2024-10-22 22:29:15', NULL);
INSERT INTO `sys_department` VALUES (2, '总公司', 1, 1, 1, '2024-10-22 22:29:15', '2024-10-22 22:29:15', NULL);
INSERT INTO `sys_department` VALUES (3, '分公司', 1, 1, 1, '2024-10-22 22:29:15', '2024-10-22 22:29:15', NULL);
INSERT INTO `sys_department` VALUES (4, '研发部门', 2, 1, 1, '2024-10-22 22:29:15', '2024-10-22 22:29:15', NULL);
INSERT INTO `sys_department` VALUES (5, '测试部门', 2, 1, 1, '2024-10-22 22:29:15', '2024-10-22 22:29:15', NULL);
INSERT INTO `sys_department` VALUES (6, '市场部门', 2, 1, 1, '2024-10-22 22:29:15', '2024-10-22 22:29:15', NULL);
INSERT INTO `sys_department` VALUES (7, '市场部门', 3, 1, 1, '2024-10-22 22:29:15', '2024-10-22 22:29:15', NULL);

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `parent_id` int NOT NULL DEFAULT 0,
  `sort` int NULL DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `is_link` tinyint NULL DEFAULT NULL,
  `is_enable` tinyint NULL DEFAULT NULL,
  `is_affix` tinyint NULL DEFAULT NULL,
  `is_keep_alive` tinyint NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  `deleted_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES (1, 'dashboard', '/dashboard', 0, 1, '主面板', 'zhuye', 0, 1, 1, 1, '2024-10-22 22:29:15', '2024-10-22 22:29:15', NULL);
INSERT INTO `sys_menu` VALUES (2, 'system', '/system', 0, 1, '系统管理', 'shezhi', 0, 1, 0, 1, '2024-10-22 22:29:15', '2024-10-22 22:29:15', NULL);
INSERT INTO `sys_menu` VALUES (3, 'accountManage', '/system/accountManage', 2, 1, '账号管理', 'yingyong', 0, 1, 0, 1, '2024-10-22 22:29:15', '2024-10-22 22:29:15', NULL);
INSERT INTO `sys_menu` VALUES (4, 'roleManage', '/system/roleManage', 2, 1, '角色管理', 'yingyong', 0, 1, 0, 1, '2024-10-22 22:29:15', '2024-10-22 22:29:15', NULL);
INSERT INTO `sys_menu` VALUES (5, 'menuManage', '/system/menuManage', 2, 1, '菜单管理', 'yingyong', 0, 1, 0, 1, '2024-10-22 22:29:15', '2024-10-22 22:29:15', NULL);
INSERT INTO `sys_menu` VALUES (6, 'departmentManage', '/system/departmentManage', 2, 1, '部门管理', 'yingyong', 0, 1, 0, 1, '2024-10-22 22:29:15', '2024-10-22 22:29:15', NULL);
INSERT INTO `sys_menu` VALUES (7, 'echarts', '/echarts', 0, 3, 'ECharts', 'tongji', 0, 1, 0, 1, '2024-06-20 15:52:44', '2024-06-20 23:08:16', NULL);
INSERT INTO `sys_menu` VALUES (8, 'waterChart', '/echarts/waterChart', 7, 1, '水型图', 'yingyong', 0, 1, 0, 1, '2024-06-20 15:52:44', '2024-06-20 15:52:44', NULL);
INSERT INTO `sys_menu` VALUES (9, 'columnChart', '/echarts/columnChart', 7, 1, '柱状图', 'yingyong', 0, 1, 0, 1, '2024-06-20 15:52:44', '2024-06-20 15:52:44', NULL);
INSERT INTO `sys_menu` VALUES (10, 'menu', '/menu', 0, 4, '菜单嵌套', 'caidan', 0, 1, 0, 1, '2024-06-20 15:52:44', '2024-06-20 15:52:44', NULL);
INSERT INTO `sys_menu` VALUES (11, 'menu1', '/menu/menu1', 10, 1, '菜单1', 'yingyong', 0, 1, 0, 1, '2024-06-20 15:52:44', '2024-06-20 15:52:44', NULL);
INSERT INTO `sys_menu` VALUES (12, 'menu2', '/menu/menu2', 10, 1, '菜单2', 'yingyong', 0, 1, 0, 1, '2024-06-20 15:52:44', '2024-06-20 15:52:44', NULL);
INSERT INTO `sys_menu` VALUES (13, 'menu21', '/menu/menu2/menu21', 12, 1, '菜单2-1', 'yingyong', 0, 1, 0, 1, '2024-06-20 15:52:44', '2024-06-20 15:52:44', NULL);
INSERT INTO `sys_menu` VALUES (14, 'menu22', '/menu/menu2/menu22', 12, 1, '菜单2-2', 'yingyong', 0, 1, 0, 1, '2024-06-20 15:52:44', '2024-06-20 15:52:44', NULL);
INSERT INTO `sys_menu` VALUES (15, 'menu221', '/menu/menu2/menu22/menu221', 14, 1, '菜单2-2-1', 'yingyong', 0, 1, 0, 1, '2024-06-20 15:52:44', '2024-06-20 15:52:44', NULL);
INSERT INTO `sys_menu` VALUES (16, 'menu222', '/menu/menu2/menu22/menu222', 14, 1, '菜单2-2-2', 'yingyong', 0, 1, 0, 1, '2024-06-20 15:52:44', '2024-06-20 15:52:44', NULL);
INSERT INTO `sys_menu` VALUES (17, 'menu23', '/menu/menu2/menu23', 12, 1, '菜单2-3', 'yingyong', 0, 1, 0, 1, '2024-06-20 15:52:44', '2024-06-20 15:52:44', NULL);
INSERT INTO `sys_menu` VALUES (18, 'menu3', '/menu/menu3', 10, 1, '菜单3', 'yingyong', 0, 1, 0, 1, '2024-06-20 15:52:44', '2024-06-20 15:52:44', NULL);

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `role` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `role_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `is_super` tinyint NOT NULL DEFAULT 0,
  `remark` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES (1, 'super_admin', '超级管理员', 1, NULL, '2024-10-22 22:29:15', '2024-10-22 22:29:15');
INSERT INTO `sys_role` VALUES (2, 'user', '普通用户', 0, '', '2024-10-22 22:29:15', '2024-10-22 23:03:02');

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu`  (
  `role_id` bigint NOT NULL,
  `menu_id` bigint NOT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`role_id`, `menu_id`) USING BTREE,
  UNIQUE INDEX `sys_role_menu_menuId_roleId_unique`(`role_id`, `menu_id`) USING BTREE,
  INDEX `menu_id`(`menu_id`) USING BTREE,
  CONSTRAINT `sys_role_menu_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `sys_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sys_role_menu_ibfk_2` FOREIGN KEY (`menu_id`) REFERENCES `sys_menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
INSERT INTO `sys_role_menu` VALUES (1, 1, '2024-10-22 22:29:15', '2024-10-22 22:29:15');
INSERT INTO `sys_role_menu` VALUES (1, 2, '2024-10-22 22:29:15', '2024-10-22 22:29:15');
INSERT INTO `sys_role_menu` VALUES (1, 3, '2024-10-22 22:29:15', '2024-10-22 22:29:15');
INSERT INTO `sys_role_menu` VALUES (1, 4, '2024-10-22 22:29:15', '2024-10-22 22:29:15');
INSERT INTO `sys_role_menu` VALUES (1, 5, '2024-10-22 22:29:15', '2024-10-22 22:29:15');
INSERT INTO `sys_role_menu` VALUES (1, 6, '2024-10-22 22:29:15', '2024-10-22 22:29:15');
INSERT INTO `sys_role_menu` VALUES (1, 7, '2024-10-22 22:29:15', '2024-10-22 22:29:15');
INSERT INTO `sys_role_menu` VALUES (1, 8, '2024-10-22 22:29:15', '2024-10-22 22:29:15');
INSERT INTO `sys_role_menu` VALUES (1, 9, '2024-10-22 22:29:15', '2024-10-22 22:29:15');
INSERT INTO `sys_role_menu` VALUES (1, 10, '2024-10-22 22:29:15', '2024-10-22 22:29:15');
INSERT INTO `sys_role_menu` VALUES (1, 11, '2024-10-22 22:29:15', '2024-10-22 22:29:15');
INSERT INTO `sys_role_menu` VALUES (1, 12, '2024-10-22 22:29:15', '2024-10-22 22:29:15');
INSERT INTO `sys_role_menu` VALUES (1, 13, '2024-10-22 22:29:15', '2024-10-22 22:29:15');
INSERT INTO `sys_role_menu` VALUES (1, 14, '2024-10-22 22:29:15', '2024-10-22 22:29:15');
INSERT INTO `sys_role_menu` VALUES (1, 15, '2024-10-22 22:29:15', '2024-10-22 22:29:15');
INSERT INTO `sys_role_menu` VALUES (1, 16, '2024-10-22 22:29:15', '2024-10-22 22:29:15');
INSERT INTO `sys_role_menu` VALUES (1, 17, '2024-10-22 22:29:15', '2024-10-22 22:29:15');
INSERT INTO `sys_role_menu` VALUES (1, 18, '2024-10-22 22:29:15', '2024-10-22 22:29:15');
INSERT INTO `sys_role_menu` VALUES (2, 1, '2024-10-22 23:03:02', '2024-10-22 23:03:02');
INSERT INTO `sys_role_menu` VALUES (2, 7, '2024-10-22 23:03:02', '2024-10-22 23:03:02');
INSERT INTO `sys_role_menu` VALUES (2, 8, '2024-10-22 23:03:02', '2024-10-22 23:03:02');
INSERT INTO `sys_role_menu` VALUES (2, 9, '2024-10-22 23:03:02', '2024-10-22 23:03:02');
INSERT INTO `sys_role_menu` VALUES (2, 10, '2024-10-22 23:03:02', '2024-10-22 23:03:02');
INSERT INTO `sys_role_menu` VALUES (2, 11, '2024-10-22 23:03:02', '2024-10-22 23:03:02');
INSERT INTO `sys_role_menu` VALUES (2, 12, '2024-10-22 23:03:02', '2024-10-22 23:03:02');
INSERT INTO `sys_role_menu` VALUES (2, 13, '2024-10-22 23:03:02', '2024-10-22 23:03:02');
INSERT INTO `sys_role_menu` VALUES (2, 14, '2024-10-22 23:03:02', '2024-10-22 23:03:02');
INSERT INTO `sys_role_menu` VALUES (2, 15, '2024-10-22 23:03:02', '2024-10-22 23:03:02');
INSERT INTO `sys_role_menu` VALUES (2, 16, '2024-10-22 23:03:02', '2024-10-22 23:03:02');
INSERT INTO `sys_role_menu` VALUES (2, 17, '2024-10-22 23:03:02', '2024-10-22 23:03:02');
INSERT INTO `sys_role_menu` VALUES (2, 18, '2024-10-22 23:03:02', '2024-10-22 23:03:02');

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `username` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `dept_id` int NOT NULL DEFAULT 1,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `phone` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `avatar` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `remark` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  `deleted_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE,
  INDEX `dept_id`(`dept_id`) USING BTREE,
  CONSTRAINT `sys_user_ibfk_1` FOREIGN KEY (`dept_id`) REFERENCES `sys_department` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES (1, '管理员', 'admin', '$2b$10$SAPfKamIxnPmH4QRLHa7ouZOrnKZwXWcgE5h8..qtawcJ.Okh0eba', 4, NULL, NULL, NULL, NULL, '2024-10-22 22:29:15', '2024-10-22 22:29:15', NULL);
INSERT INTO `sys_user` VALUES (2, '测试用户', 'test', '$2b$10$nsdHrfVs6CExHWiIFY2tve4PguF/RP5nI55WtTICoTnfKMvgXyOsq', 5, NULL, NULL, NULL, NULL, '2024-10-22 22:29:15', '2024-10-22 22:29:15', NULL);

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role`  (
  `user_id` bigint NOT NULL,
  `role_id` bigint NOT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  `deleted_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`, `role_id`) USING BTREE,
  UNIQUE INDEX `sys_user_role_roleId_userId_unique`(`user_id`, `role_id`) USING BTREE,
  INDEX `role_id`(`role_id`) USING BTREE,
  CONSTRAINT `sys_user_role_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `sys_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sys_user_role_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `sys_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
INSERT INTO `sys_user_role` VALUES (1, 1, '2024-10-22 22:29:15', '2024-10-22 22:29:15', NULL);
INSERT INTO `sys_user_role` VALUES (2, 2, '2024-10-22 22:29:15', '2024-10-22 22:29:15', NULL);

SET FOREIGN_KEY_CHECKS = 1;
