const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "ytdhpvcgd1mtxiy2",
  host: "eyw6324oty5fsovx.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  password: "zo21snwk0x02ml1v",
  database: "u61oravo40gazio4",
});

db.connect((err) => {
  if (err) {
    console.log("Database Connection Failed !!!", err);
  } else {
    console.log("connected to Database");
  }
});

app.get("/years", (req, res) => {
  db.query(
    `SELECT YEAR(date) as Year from Thairath_Metadata GROUP BY Year ORDER BY Year
      `,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/thairathNewsRecords", (req, res) => {
  console.log(req.query.yearStart, req.query.yearEnd, req.query.crimeType);
  if (req.query.crimeType === "") {
    db.query(
      `SELECT YEAR(date) as year, COUNT(*) as 'Numbers'
      FROM Thairath_Metadata WHERE YEAR(date) between ? and ? 
      GROUP BY year
      ORDER BY year;
        `,
      [req.query.yearStart, req.query.yearEnd],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.send(result);
          console.log(result);
        }
      }
    );
  } else {
    db.query(
      `SELECT YEAR(date) as year, COUNT(*) as 'Numbers'
   FROM Thairath_Metadata 
   WHERE YEAR(date) BETWEEN ? AND ? AND \`${req.query.crimeType}\` = 1
   GROUP BY year
   ORDER BY year`,
      [req.query.yearStart, req.query.yearEnd],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.send(result);
          console.log("Thairath");
          console.log(result);
        }
      }
    );
  }
});

app.get("/dailyNewsRecords", (req, res) => {
  if (req.query.crimeType === "") {
    db.query(
      `SELECT YEAR(date) as year, COUNT(*) as 'Numbers'
      FROM Dailynews_Metadata WHERE YEAR(date) between ? and ? 
      GROUP BY year
      ORDER BY year;
        `,
      [req.query.yearStart, req.query.yearEnd],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.send(result);
          console.log(result);
        }
      }
    );
  } else {
    db.query(
      `SELECT YEAR(date) as year, COUNT(*) as 'Numbers'
   FROM Dailynews_Metadata
   WHERE YEAR(date) BETWEEN ? AND ? AND \`${req.query.crimeType}\` = 1
   GROUP BY year
   ORDER BY year`,
      [req.query.yearStart, req.query.yearEnd],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.send(result);
          console.log("Dailynews");
          console.log(result);
        }
      }
    );
  }
});

app.get("/thairathcrimetypes", (req, res) => {
  console.log(req.query.year);
  if (req.query.year === "") {
    db.query(
      `SELECT 
      SUM(Gambling) AS Gambling, 
      SUM(Murder) AS Murder,
      SUM(\`Sexual Abuse\`) AS \`Sexual Abuse\`,
      SUM(\`Theft/Burglary\`) AS \`Theft/Burglary\`,
      SUM(Drug) AS Drug,
      SUM(\`Battery/Assault\`) AS \`Battery/Assault\`,
      SUM(Accident) AS Accident
  FROM 
      Thairath_Metadata
  `,
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.send(result);
          console.log("Thairath");
          console.log(result);
        }
      }
    );
  } else {
    db.query(
      `SELECT 
      SUM(Gambling) AS Gambling, 
      SUM(Murder) AS Murder,
      SUM(\`Sexual Abuse\`) AS \`Sexual Abuse\`,
      SUM(\`Theft/Burglary\`) AS \`Theft/Burglary\`,
      SUM(Drug) AS Drug,
      SUM(\`Battery/Assault\`) AS \`Battery/Assault\`,
      SUM(Accident) AS Accident
  FROM 
      Thairath_Metadata
  WHERE 
    YEAR(date) = ?
  `,
      [req.query.year],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.send(result);
          console.log("Thairath");
          console.log(result);
        }
      }
    );
  }
});

app.get("/dailynewscrimetypes", (req, res) => {
  console.log(req.query.year);
  if (req.query.year === "") {
    db.query(
      `SELECT 
      SUM(Gambling) AS Gambling, 
      SUM(Murder) AS Murder,
      SUM(\`Sexual Abuse\`) AS \`Sexual Abuse\`,
      SUM(\`Theft/Burglary\`) AS \`Theft/Burglary\`,
      SUM(Drug) AS Drug,
      SUM(\`Battery/Assault\`) AS \`Battery/Assault\`,
      SUM(Accident) AS Accident
  FROM 
    Dailynews_Metadata
  `,
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.send(result);
          console.log("Thairath");
          console.log(result);
        }
      }
    );
  } else {
    db.query(
      `SELECT 
      SUM(Gambling) AS Gambling, 
      SUM(Murder) AS Murder,
      SUM(\`Sexual Abuse\`) AS \`Sexual Abuse\`,
      SUM(\`Theft/Burglary\`) AS \`Theft/Burglary\`,
      SUM(Drug) AS Drug,
      SUM(\`Battery/Assault\`) AS \`Battery/Assault\`,
      SUM(Accident) AS Accident
  FROM 
    Dailynews_Metadata
  WHERE 
    YEAR(date) = ?
  `,
      [req.query.year],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.send(result);
          console.log("Thairath");
          console.log(result);
        }
      }
    );
  }
});

app.get("/thairathCrimesCount", (req, res) => {
  console.log(req.query.year);
  if (req.query.year === "") {
    db.query(
      `SELECT MONTH(date) as month, COUNT(*) as 'Numbers'
      FROM Thairath_Metadata
      GROUP BY MONTH(date)
      ORDER BY MONTH(date);
  `,
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.send(result);
          console.log("Thairath");
          console.log(result);
        }
      }
    );
  } else {
    db.query(
      `SELECT MONTH(date) as month, COUNT(*) as 'Numbers'
      FROM Thairath_Metadata WHERE YEAR(date) = ?
      GROUP BY MONTH(date)
      ORDER BY MONTH(date);
  `,
      [req.query.year],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.send(result);
          console.log("Thairath");
          console.log(result);
        }
      }
    );
  }
});

app.get("/dailynewsCrimesCount", (req, res) => {
  console.log(req.query.year);
  if (req.query.year === "") {
    db.query(
      `SELECT MONTH(date) as month, COUNT(*) as 'Numbers'
      FROM Dailynews_Metadata
      GROUP BY MONTH(date)
      ORDER BY MONTH(date);
  `,
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.send(result);
          console.log("DailyNews");
          console.log(result);
        }
      }
    );
  } else {
    db.query(
      `SELECT MONTH(date) as month, COUNT(*) as 'Numbers'
      FROM Dailynews_Metadata WHERE YEAR(date) = ?
      GROUP BY MONTH(date)
      ORDER BY MONTH(date);
  `,
      [req.query.year],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.send(result);
          console.log("DailyNews");
          console.log(result);
        }
      }
    );
  }
});


app.get("/news_crimes_statistics_per_year", (req, res) => {
  db.query(
          ` SELECT SUM(Gambling) AS Gambling,
          SUM(Murder) AS Murder,
          SUM(\`Sexual Abuse\`) AS \`Sexual Abuse\`,
          SUM(\`Theft/Burglary\`) AS \`Theft/Burglary\`,
          SUM(Drug) AS Drug,
          SUM(\`Battery/Assault\`) AS \`Battery/Assault\`,
          SUM(Accident) AS Accident from news_crime_statistics where year between ? and ?;
        `,[req.query.yearStart, req.query.yearEnd],
          
          (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).send(err);
            } else {
              res.send(result);
              console.log(result);
            }
          }
        );
//   if (req.query.year === "") {
//     db.query(
//       `SELECT SUM(Gambling) AS Gambling,
//       SUM(Murder) AS Murder,
//       SUM(\`Sexual Abuse\`) AS \`Sexual Abuse\`,
//       SUM(\`Theft/Burglary\`) AS \`Theft/Burglary\`,
//       SUM(Drug) AS Total_Drug,
//       SUM(\`Battery/Assault\`) AS \`Battery/Assault\`,
//       SUM(Accident) AS Accident
// FROM news_crime_statistics;
//     `,
      
//       (err, result) => {
//         if (err) {
//           console.log(err);
//           res.status(500).send(err);
//         } else {
//           res.send(result);
//           console.log(result);
//         }
//       }
//     );


//   } else {

//     db.query(
//       `SELECT * from news_crime_statistics where year = ?
//     `,
//       [req.query.year],
//       (err, result) => {
//         if (err) {
//           console.log(err);
//           res.status(500).send(err);
//         } else {
//           res.send(result);
//           console.log(result);
//         }
//       }
//     );

//   }
 
});



app.get("/news_crimes_summary", (req, res) => {
  if(req.query.crimeType === "") {
    db.query(
      `SELECT year, month, SUM(Gambling + Murder + \`Sexual Abuse\` + \`Theft/Burglary\` + Drug + \`Battery/Assault\` + Accident) as Numbers FROM news_summary_table_monthly_all_year
      WHERE year between ? and ?
      group by year,month  
      order by year, month
    `,
      [req.query.yearStart, req.query.yearEnd],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.send(result);
          console.log(result);
        }
      }
    );

  } else {
    db.query(
      `SELECT year, month, SUM(\`${req.query.crimeType}\`) as Numbers FROM news_summary_table_monthly_all_year
      WHERE year between ? and ?
      group by year,month  
      order by year, month
    `,
      [req.query.yearStart, req.query.yearEnd],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.send(result);
          console.log(result);
        }
      }
    );

  }
  
});

app.get("/news_crime_statistics", (req, res) => {
  console.log(req.query.crimeType)
  if (req.query.crimeType === "") {
    db.query(
      `SELECT year, SUM(Gambling + Murder + \`Sexual Abuse\` + \`Theft/Burglary\` + Drug + \`Battery/Assault\` + Accident) AS Numbers from news_crime_statistics where year between ? and ? group by year`,
      [req.query.yearStart, req.query.yearEnd]
      ,
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.send(result);
          console.log(result);
        }
      }
    );

  } else {
    db.query(
      `select year, SUM(\`${req.query.crimeType}\`) as Numbers from news_crime_statistics where year between ? and ? group by year`,
      [req.query.yearStart, req.query.yearEnd]
      ,
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.send(result);
          console.log(result);
        }
      }
    );

  }
});



app.get("/dailynews_crimes_summary", (req, res) => {
  db.query(
    `SELECT month, SUM(numbers) as Numbers FROM dailynews_summary_table_monthly_all_year
    WHERE year between ? and ?
    group by month
    order by month
`,
    [req.query.yearStart, req.query.yearEnd],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.send(result);
        console.log("Thairath");
        console.log(result);
      }
    }
  );
});

app.get("/thairath_crimes_statistics", (req, res) => {
  console.log(req.query.year);

  if (req.query.year !== "") {
    db.query(
      `SELECT * from thairath_crime_statistics
      WHERE YEAR= ?
  `,
      [req.query.year],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.send(result);
          console.log("Thairath");
          console.log(result);
        }
      }
    );
  } else {
    db.query(
      `SELECT SUM(Gambling) as Gambling, SUM(Murder) as Murder, SUM(\`Sexual Abuse\`) as 'Sexual Abuse', SUM(\`Theft/Burglary\`) as 'Theft/Burglary', SUM(Drug) as Drug, SUM(\`Battery/Assault\`) as 'Battery/Assualt', SUM(Accident) as Accident from thairath_crime_statistics


  `,
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.send(result);
          console.log("Thairath");
          console.log(result);
        }
      }
    );
  }
});

app.get("/dailynews_crimes_statistics", (req, res) => {
  if (req.query.year !== "") {
    db.query(
      `SELECT * from dailynews_crime_statistics
      WHERE YEAR= ?
  `,
      [req.query.year],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.send(result);
          console.log("Dailynews");
          console.log(result);
        }
      }
    );
  } else {
    db.query(
      `SELECT SUM(Gambling) as Gambling, SUM(Murder) as Murder, SUM(\`Sexual Abuse\`) as 'Sexual Abuse', SUM(\`Theft/Burglary\`) as 'Theft/Burglary', SUM(Drug) as Drug, SUM(\`Battery/Assault\`) as 'Battery/Assualt', SUM(Accident) as Accident from dailynews_crime_statistics
  `,
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.send(result);
          console.log("Dailynews");
          console.log(result);
        }
      }
    );
  }
});


app.get("/provinces_statistics", (req, res) => {

    db.query(
      `select * from news_statistics_by_province order by numbers desc
  `,
      [req.query.year],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.send(result);
          console.log(result);
        }
      }
    );
  
});

app.listen(3001, "0.0.0.0", function () {
  console.log("Listening to port:  " + 3001);
});
