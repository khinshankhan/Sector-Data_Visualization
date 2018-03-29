# Sector-Data_Visualization

![Alt text](_imgs/sector_temp.png?raw=true)<!-- .element height="50%" width="50%" -->
## **(Khinshan Khan, Ryan Siu, James Smith, Jake Zaia)**

### **Project 01:** Dazzling Data Dives

### **Project Manager:** Khinshan Khan

### **Work Division:** TBA (ambiguous as of right now)

---

#### **What is it?**

The goal is to “tell a story with your data”, by bringing numbers to life. In order to make it interactive, we decided to have a quiz aspect that engages the user. The user keeps picking the country with the larger population (this will have a score functionality) from questions we generate based on countries remaining. The ‘losing’ countries (the ones with the lesser population) are ranked into the table in real-time. But, we thought that was still boring. Thus we decided to translate it a pie chart, where each sector area is proportional to their respective country’s population related to the summation of all the countries’ populations. The pie chart should also have a hover feature that shows the statistics of the countries that are already done (we’re thinking about differentiating between done and undone with color, where done is shades of blue and undone are shades of red). In addition, we would easily display the data in a few other forms, which the user could switch between (ex: bar chart instead of pie chart). We plan on utilizing D3 definitely for the pie chart (which should be an svg element) and maybe for the ranking table [see visualization.html]. In addition, D3 supports the coloring concept we have [for the pie chart].

#### **Data Links:**
https://data.worldbank.org/indicator/SP.POP.TOTL 

Shows the population of many countries. Goes from 1960 to 2016, may try to find something more recent, but easy-to-use data so we may keep it.

#### **Component Map:**
##### **Templates:**

home.html
![Alt text](_imgs/home_fixed.png?raw=true)<!-- .element height="50%" width="50%" -->

visualization.html
![Alt text](_imgs/visualization.png?raw=true)<!-- .element height="50%" width="50%" -->

### **NOTE! THIS IS BY NO MEANS COMPLETE, JUST A ROUGH DRAFT AS OF NOW 3/28**

##### **Framework:** Bootstrap

#### **Site Map:**
TBA (not too clear as of yet?)
