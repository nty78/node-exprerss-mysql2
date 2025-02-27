const express = require('express')
const app = express()
const port = 3000
const mysql  = require('mysql2')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const conn = mysql.createPool({
    host: 'localhost',    
    user: 'root',         
    password: 'root',         
    database: 'test'  
});

app.get('/users', async (req, res) => {
    let sqlCategories = "SELECT * FROM categories"
    let sqlSubcategory = "SELECT * FROM course_subcategory"
    let sqlCourses = "SELECT * FROM courses"
    let sqlSubcategories = "SELECT * FROM subcategories"

    // เรียกข้อมูลจากตาราง categories
    conn.execute(sqlCategories, (err, resultCategories) => {
        if (err) {
            res.status(500).json({ 
                message: err.message 
            })
            return
        }

        // เรียกข้อมูลจากตาราง course_subcategory
        conn.execute(sqlSubcategory, (err, resultSubcategory) => {
            if (err) {
                res.status(500).json({ 
                    message: err.message 
                })
                return
            }

            // เรียกข้อมูลจากตาราง courses
            conn.execute(sqlCourses, (err, resultCourses) => {
                if (err) {
                    res.status(500).json({ 
                        message: err.message 
                    })
                    return
                }

                // เรียกข้อมูลจากตาราง subcategories
                conn.execute(sqlSubcategories, (err, resultSubcategories) => {
                    if (err) {
                        res.status(500).json({ 
                            message: err.message 
                        })
                        return
                    }

                    // ส่งข้อมูลทั้งหมดใน response เดียว
                    res.status(200).json({
                        message: "เรียกข้อมูลสำเร็จ",
                        data: {
                            categories: resultCategories,
                            course_subcategory: resultSubcategory,
                            courses: resultCourses,
                            subcategories: resultSubcategories
                        }
                    })
                })
            })
        })
    })
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
