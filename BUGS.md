# AstroVani – Bug Notes (for the presenter)

**How to run:** double-click `index.html`. You don't need a server or any installs.

**Files**
- `index.html`: page structure (navbar, hero, zodiac cards, horoscope form, love match, booking form, footer)
- `style.css`: all the styling, plus a media query for mobile
- `script.js`: zodiac data, sign calculation, horoscope, love match, booking form

These bugs are left in on purpose so you can show them, explain why they happen and show the fix.

---

### Bug 1: "Contact" link in the navbar does nothing
- **Where:** `index.html`. The nav has `href="#contact"`, but the section is `id="contct"` (typo).
- **Show it:** click "Contact" in the navbar. The page doesn't scroll.
- **Why:** an anchor link only works when the `href` exactly matches an element's `id`.
- **Fix:** rename the section to `id="contact"`.

### Bug 2: People born on 19 April get "Unknown" as their sign
- **Where:** `script.js`, `getZodiacSign()`, the Aries line: `month == 4 && day < 19`
- **Show it:** enter DOB **19 April** (any year). The result says "You are a Unknown".
- **Why:** off-by-one error. `< 19` leaves out the 19th, and Taurus only starts from the 20th, so no condition matches.
- **Fix:** change it to `day <= 19`.

### Bug 3: Age is sometimes 1 year too high
- **Where:** `script.js`, `getAge()`
- **Show it:** enter a birthday later this year, e.g. 25 Dec 2005. It shows 21, but the person is still 20.
- **Why:** it only subtracts the years and never checks whether the birthday has already happened this year.
- **Fix:**
  ```js
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age;
  ```

### Bug 4: The name can be left empty
- **Where:** `script.js`, `findHoroscope()`. Only the DOB is checked.
- **Show it:** leave the name blank. The result shows "Hello ! You are a …".
- **Fix:** add `if (name.trim() == "") { alert("Enter your name"); return; }`

### Bug 5: A future date of birth is accepted
- **Where:** `findHoroscope()`. There is no check on the date.
- **Show it:** pick a date in 2030. The age comes out negative (e.g. -4 years).
- **Fix:** `if (dob > new Date()) { alert("DOB can't be in the future"); return; }`. You can also add a `max` attribute on the date input.

### Bug 6: Love match gives a different % every time for the same pair
- **Where:** `checkMatch()` uses `Math.random()`.
- **Show it:** pick Leo + Libra and click "Check Match" 3 times. You get 3 different results.
- **Why:** the result is random, not based on the signs, so it isn't consistent.
- **Fix:** base it on the signs. Example: same element = 90%, Fire+Air or Earth+Water = 75%, anything else = 50%.

### Bug 7: Phone number accepts letters and any length
- **Where:** `index.html`, booking form, `<input type="text" id="cPhone">`
- **Show it:** type `abc` as the phone number and the booking still gets "confirmed".
- **Fix:** `<input type="tel" pattern="[0-9]{10}" title="Enter 10 digit number" required>`

### Bug 8: Zodiac cards break the layout on mobile
- **Where:** `style.css`, `.zodiac-grid { width: 1200px; }`
- **Show it:** open DevTools (F12), switch to the mobile view, and the page scrolls sideways.
- **Why:** a fixed pixel width doesn't shrink on small screens, even though the media query changes the columns.
- **Fix:** use `max-width: 1200px; width: 100%;`

### Bug 9: Footer year is hardcoded as 2026
- **Where:** `index.html` footer
- **Why:** the year is typed by hand, so on 1 Jan 2027 the site will still say 2026 until someone edits it.
- **Fix:** `<span id="year"></span>` plus this in JS: `document.getElementById("year").textContent = new Date().getFullYear();`

---

### Bonus (if the examiner asks something advanced)
- **Security (XSS):** the name is put on the page with `innerHTML`. Typing `<b>hi</b>` as the name shows bold text, so a user can inject HTML. Using `textContent` prevents this.
- **Timezone:** `new Date("2005-04-19")` is read as UTC. In India it's fine, but in the USA the day can shift by 1 and give the wrong sign.
