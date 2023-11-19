<?php
/*
Plugin Name: GPA Calculator by www.calculator.io
Plugin URI: https://www.calculator.io/gpa-calculator/
Description: This GPA calculator computes your GPA and creates a report based on your course credits and grade. Both numerical and letter grades are accepted.
Version: 1.0.0
Author: Calculator.io
Author URI: https://www.calculator.io/
License: GPLv2 or later
Text Domain: ci_gpa_calculator
*/

if (!defined('ABSPATH')) exit;

if (!function_exists('add_shortcode')) return "No direct call for GPA Calculator by Calculator.iO";

function display_ci_gpa_calculator(){
    $page = 'index.html';
    return '<h2><img src="' . esc_url(plugins_url('assets/images/icon-48.png', __FILE__ )) . '" width="48" height="48">GPA Calculator</h2><div><iframe style="background:transparent; overflow: scroll" src="' . esc_url(plugins_url($page, __FILE__ )) . '" width="100%" frameBorder="0" allowtransparency="true" onload="this.style.height = this.contentWindow.document.documentElement.scrollHeight + \'px\';" id="ci_gpa_calculator_iframe"></iframe></div>';
}

add_shortcode( 'ci_gpa_calculator', 'display_ci_gpa_calculator' );