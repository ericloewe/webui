# Author: Rishabh Chauhan
# License: BSD
# Location for tests  of FreeNAS new GUI
# Test case count: 5

import sys
import os
import time
cwd = str(os.getcwd())
sys.path.append(cwd)
from function import take_screenshot, user_edit
from source import newusername, newgroupname

skip_mesages = "Skipping first run"
script_name = os.path.basename(__file__).partition('.')[0]


xpaths = {
    'navAccount': '//*[@id="nav-1"]/div/a[1]',
    'submenuUser': '//*[@id="1-1"]',
    'submenuGroup': '//*[@id="1-0"]',
    'email': "//div[@id='email']/mat-form-field/div/div/div/input",
    'group': '//*[@id="bsdgrp_sudo"]/mat-checkbox/label/div',
    'breadcrumbBar': '//*[@id="breadcrumb-bar"]/ul/li[2]/a'
}


def test_00_set_implicitly_wait(wb_driver):
    wb_driver.implicitly_wait(1)


def test_01_nav_acc_user(wb_driver):
    # Click  Account menu
    wb_driver.find_element_by_xpath(xpaths['navAccount']).click()
    # allowing the button to load
    time.sleep(1)
    # Click User submenu
    wb_driver.find_element_by_xpath(xpaths['submenuUser']).click()
    # get the ui element
    ui_element = wb_driver.find_element_by_xpath(xpaths['breadcrumbBar'])
    # get the weather data
    page_data = ui_element.text
    # assert response
    assert "User" in page_data, page_data
    # taking screenshot
    test_name = sys._getframe().f_code.co_name
    take_screenshot(wb_driver, script_name, test_name)


def test_02_edit_userNAS_email(wb_driver):
    time.sleep(2)
    # call edit funtion on the userNAS
    user_edit(wb_driver, "user", newusername)
    # get the ui element
    ui_email = wb_driver.find_element_by_xpath(xpaths['email'])
    ui_email.clear()
    ui_email.send_keys("test2@ixsystems.com")
    # taking screenshot
    test_name = sys._getframe().f_code.co_name
    take_screenshot(wb_driver, script_name, test_name)


def test_03_edit_userNAS_sudo(wb_driver):
    # Changing permission to sudo
    ui_sudo = wb_driver.find_element_by_xpath('//*[@id="sudo"]/mat-checkbox')
    user_edit(wb_driver, "user", newusername)
    wb_driver.find_element_by_xpath('//*[@id="save_button"]').click()
    time.sleep(15)
    # taking screenshot
    test_name = sys._getframe().f_code.co_name
    take_screenshot(wb_driver, script_name, test_name)


def test_04_nav_acc_group(wb_driver):
    # Click  Account menu
    # Click User submenu
    wb_driver.find_element_by_xpath(xpaths['submenuGroup']).click()
    # get the ui element
    ui_element = wb_driver.find_element_by_xpath(xpaths['breadcrumbBar'])
    # get the weather data
    page_data = ui_element.text
    # assert response
    assert "Group" in page_data, page_data
    # taking screenshot
    test_name = sys._getframe().f_code.co_name
    take_screenshot(wb_driver, script_name, test_name)


def test_05_edit_groupNAS_sudo(wb_driver):
    time.sleep(2)
    user_edit(wb_driver, "group", newgroupname)
    wb_driver.find_element_by_xpath(xpaths['group']).click()
    wb_driver.find_element_by_xpath('//*[@id="save_button"]').click()
    time.sleep(20)
    # taking screenshot
    test_name = sys._getframe().f_code.co_name
    take_screenshot(wb_driver, script_name, test_name)
