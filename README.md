# [GluBoard](https://gluboard.auxcoder.com/gluboard)

A simple Dashboard for blood samples and Glucose values.

## Usage

After installation, run `npm install` and then run `npm start` which will open up a preview of the template in your default browser, watch for changes to core template files, and live reload the browser when changes are saved. You can view the `gulpfile.js` to see which tasks are included with the dev environment.

---

### Gulp Tasks

- `gulp` the default task that builds everything
- `gulp watch` browserSync opens the project in your default browser and live reloads when changes are made
- `gulp css` compiles SCSS files into CSS and minifies the compiled CSS
- `gulp js` minifies the themes JS file
- `gulp vendor` copies dependencies from node_modules to the vendor directory

---

## Todo

- [Units converter](https://www.diabetes.co.uk/blood-sugar-converter.html)

---

## Dataset

[datasets](https://archive.ics.uci.edu/ml/datasets/Diabetes)

### Sample Codes

- 33 = Regular insulin dose
- 34 = NPH* (isophane insulin) insulin dose
- 35 = UltraLente insulin dose
- 48 = Unspecified blood glucose measurement
- 57 = Unspecified blood glucose measurement
- 58 = Pre-breakfast blood glucose measurement
- 59 = Post-breakfast blood glucose measurement
- 60 = Pre-lunch blood glucose measurement
- 61 = Post-lunch blood glucose measurement
- 62 = Pre-supper blood glucose measurement
- 63 = Post-supper blood glucose measurement
- 64 = Pre-snack blood glucose measurement
- 65 = Hypoglycemic symptoms
- 66 = Typical meal ingestion
- 67 = More-than-usual meal ingestion
- 68 = Less-than-usual meal ingestion
- 69 = Typical exercise activity
- 70 = More-than-usual exercise activity
- 71 = Less-than-usual exercise activity
- 72 = Unspecified special event

\*Neutral Protamine Hagedorn, intermediate acting insulins are often taken in conjunction with a short acting insulin. Intermediate acting insulins start to act within the first hour of injecting, followed by a period of peak activity lasting up to 7 hours.
