<?php
/*
Plugin Name: GPA Calculator by Calculator.iO
Plugin URI: https://www.calculator.io/gpa-calculator/
Description: Calculate your high school or college GPA in seconds. Our free GPA calculator computes your cumulative Grade Point Average using letter or number grades.
Version: 1.0.0
Author: www.calculator.io / GPA Calculator
Author URI: https://www.calculator.io/
License: GPLv2 or later
Text Domain: calcio_gpa_calculator
*/

if (!defined('ABSPATH')) exit;

if (!function_exists('add_shortcode')) return "No direct call for GPA Calculator by www.calculator.io";

function calcio_gpa_calculator_shortcode(){
    $page = 'index.html';
    return '<h2><img src="' . esc_url(plugins_url('assets/images/icon-48.png', __FILE__ )) . '" width="48" height="48">GPA Calculator</h2><div><iframe style="background:transparent; overflow: scroll" src="' . esc_url(plugins_url($page, __FILE__ )) . '" width="100%" frameBorder="0" allowtransparency="true" onload="this.style.height = this.contentWindow.document.documentElement.scrollHeight + \'px\';" id="calcio_gpa_calculator_iframe"></iframe></div>';
}


add_shortcode( 'calcio_gpa_calculator', 'calcio_gpa_calculator_shortcode' );