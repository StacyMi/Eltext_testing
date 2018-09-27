package com.exampe.quotes;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Random;

@Controller
public class AppController {

    @GetMapping("/quotes")
    public String quotes() {
        return "index.html";
    }

    @GetMapping("/styles/main.css")
    public String styles() {
        return "/styles/main.css";
    }

    @GetMapping("/scripts/main.js")
    public String scripts() {
        return "/scripts/main.js";
    }

    @GetMapping("/text")
    public String text() {

        int min = 1;
        int max = 39;

        Random rnd = new Random(System.currentTimeMillis());
        int number = min + rnd.nextInt(max - min + 1);

        /*
         *   Figures that are less than ten have 'zero' in the file name.
         */

        if (number < 10) {
            return "/text/quotation0" + number + ".txt";
        } else {
            return "/text/quotation" + number + ".txt";
        }
    }
}
