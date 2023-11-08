# GPA Calculator WordPress Widget by [Calculator.iO](https://www.calculator.io/ "Calculator.iO Homepage")

This GPA calculator computes your GPA and creates a report based on your course credits and grade. Both numerical and letter grades are accepted.

![GPA Calculator Input Form](/assets/images/screenshot-1.png "GPA Calculator Input Form")
![GPA Calculator Calculation Results](/assets/images/screenshot-2.png "GPA Calculator Calculation Results")

## Installation

1. [Download](https://github.com/pub-calculator-io/age-calculator/archive/refs/heads/master.zip) the ZIP file of this repository.
2. Upload the /gpa-calculator-master/ folder to the /wp-content/plugins/ directory.
3. Activate the [GPA Calculator](https://www.calculator.io/gpa-calculator/ "GPA Calculator Homepage") plugin through the "Plugins" menu in WordPress.

## Usage
* Add the shortcode `[ci_gpa_calculator]` to your page or post and configure default mortgage parameters.
* If you are using widgets, just add the GPA Calculator to the sidebar through the `Appearance -> Widgets -> GPA Calculator` menu in WordPress.
* Add the following code: `<?php display_ci_gpa_calculator(); ?>` to your template where you would like the GPA Calculator to appear.

## Libraries in Use
1. https://mathjs.org/
2. https://katex.org/
3. https://github.com/aFarkas/lazysizes
4. https://github.com/RobinHerbots/Inputmask
5. https://air-datepicker.com/
6. https://www.chartjs.org/
