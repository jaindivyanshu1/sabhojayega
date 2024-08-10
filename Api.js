const express = require("express")
const app = express()
const bodyP = require("body-parser")
const compiler = require("compilex")
const options = { stats: true }

compiler.init(options)


app.use(bodyP.json())

app.use("/codemirror-5.65.17", express.static("C:/Users/Divyanshu jain/tally/codeeditor/codemirror-5.65.17"))

app.get("/", function (req, res) {
    compiler.flush(function(){
        console.log("All temporary files are flushed !!")
    })
    res.sendFile("C:/Users/Divyanshu jain/tally/codeeditor/index.html")
})

app.post("/complie", function (req, res) {
    var code = req.body.code
    var input = req.body.input
    var lang = req.body.lang
    var user = req.body.user
    try {

    if (lang == "Cpp") {
        if (!input) {
            var envData = { OS: "windows", cmd: "g++", options: {timeout:10000} };
            compiler.compileCPP(envData, code, function (data) {
                if (data.error) {
                    res.send({output: data.error})
                    console.log(data.error)
                } else {
                    res.send({output: data.output})
                    console.log(data.output)
                }
            });
        } else {
            var envData = { OS: "windows", cmd: "g++", options: {timeout:10000}};
            compiler.compileCPPWithInput(envData, code, input, function (data) {
                if (data.error) {
                    res.send({output: data.error})
                } else {
                    res.send({output: data.output})
                }
            });
        }
    } else if (lang == "Java") {
        if (!input) {
            var envData = { OS: "windows" };
            compiler.compileJava(envData, code, function (data) {
                if (data.error) {
                    res.send({output: data.error})
                } else {
                    res.send({output: data.output})
                }
            });
        } else {
            var envData = { OS: "windows" };
            compiler.compileJavaWithInput(envData, code, input, function (data) {
                if (data.error) {
                    res.send({output: data.error})
                } else {
                    res.send({output: data.output})
                }
            });
        }
    } else if(lang == "Python") {
        if (!input) {
            var envData = { OS: "windows" };
            compiler.compilePython(envData, code, function (data) {
                if (data.error) {
                    res.send({output: data.error})
                } else {
                    res.send({output: data.output})
                }
            });
        } else {
            var envData = { OS: "windows" };
            compiler.compilePythonWithInput(envData, code, input, function (data) {
                if (data.error) {
                    res.send({output: data.error})
                } else {
                    res.send({output: data.output})
                }
            });
        }
    }
} catch (error) {
    console.log(error)
}
})
app.listen(8000)


