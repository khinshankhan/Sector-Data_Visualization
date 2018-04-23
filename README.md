# Sector-Data_Visualization

![Alt text](_imgs/sector_temp.png?raw=true)<!-- .element height="50%" width="50%" -->
## **(Khinshan Khan, Ryan Siu, James Smith, Jake Zaia)**

### **Project 01:** Dazzling Data Dives

### **Project Manager:** Khinshan Khan

### **Work Division:** 
#### Super even, we cover each other's back for everything :satisfied:

---

#### **What is it?**

The goal is to “tell a story with your data”, by bringing numbers to life. In order to make it interactive, we decided to have a quiz aspect that engages the user. To start with, the user will choose a time limit and quiz dataset size then a data (either countries' population, change in population, baby names of either male or female, or dancibility of songs; for this README, we'll talk as if the countries' population was chosen). The user keeps picking the country with the large population (this will have a score functionality) from which they preceive to be in the most (top 10, 15, 20). If right, the country is filled into the table. But, we thought that was still boring. Thus we decided to translate it a pie chart, where each sector area is proportional to their respective country’s population related to the summation of all the countries’ populations. The pie chart has a hover feature that shows the statistics of the countries that are already done, the colors of which are shades from gray to purple. In addition, we display the data in a few other forms, which the user could switch between (ex: bar chart instead of pie chart). We utilized D3 definitely for the pie chart (which should be an svg element -- that can change based on radio buttons for other graphs... the other charts: heatmap and bar graph als utilized this), and for the ranking table [see quiz.html]. In addition, D3 supports the coloring concept we have [for the pie chart]. We also disable graph options if we deemed it not fit for the dataset.

#### **Data Links:**
Population States by Census:
https://data.worldbank.org/indicator/SP.POP.TOTL

Baby Names by Social Security Administration:
https://www.ssa.gov/OACT/babynames/

Spotify Stats compiled by Kaggle:
https://www.kaggle.com/nadintamer/top-tracks-of-2017/data

#### **Component Map:**
##### **Templates:**

home.html
![Alt text](_imgs/home_final.png?raw=true)<!-- .element height="50%" width="50%" -->

quiz.html
![Alt text](_imgs/quiz1.png?raw=true)<!-- .element height="50%" width="50%" -->

![Alt text](_imgs/quiz2.png?raw=true)<!-- .element height="50%" width="50%" -->

##### **Framework:** Bootstrap

#### **Possible Questions that may arise:** :thought_balloon:
1. What was this country's population approximately?  -- Not sure which country, but maybe a million?
2. How does Country X's population compare to Country Y's population? -- Might be less? Might be more? Play to find out!
3. How can I increase my score? -- Study!
4. Who coded this??? :heart_eyes: :heart_eyes: :heart_eyes:  --Sector!
