import React, { useEffect, useState } from 'react'
import './Slider.css'
import BtnSlider from './BtnSlider'
import dataSlider from './dataSlider'
import { Card, CardBody } from 'reactstrap'
import axios from 'axios'

export default function Slider({ unit_id }) {
    const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

    const [unit, setUnit] = useState([])
    useEffect(() => {
        if (unit_id) {
          axios.get(`${API_ENDPOINT}/api/getUnit/` + unit_id).then(response =>
                setUnit(response.data)
               
            )
        }

    }, [])

    console.log("unit", unit)
    const [slideIndex, setSlideIndex] = useState(1)

    const nextSlide = () => {

        if (slideIndex !== unit.length) {
            setSlideIndex(slideIndex + 1)
        }
        else if (slideIndex === unit.length) {
            setSlideIndex(1)
        }
    }
    const prevSlide = () => {
        if (slideIndex !== 1) {
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1) {
            setSlideIndex(unit.length)
        }
    }

    const moveDot = index => {
        setSlideIndex(index)
    }

    return (

        <Card>
            <CardBody>
                <div className="container-slider">
                    {unit.map((item, index) => {
                        return (
                            <div
                                key={item.unit_id}
                                className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
                            >
                                <img
                                    src={item.unit_pictures + `${index + 1}`}
                                />
                            </div>
                        )
                    })}
                    <BtnSlider moveSlide={nextSlide} direction={"next"} />
                    <BtnSlider moveSlide={prevSlide} direction={"prev"} />

                    <div className="container-dots">
                        {Array.from({ length: 4}).map((item, index) => (
                            <div
                                onClick={() => moveDot(index + 1)}
                                className={slideIndex === index + 1 ? "dot active" : "dot"}
                            ></div>
                        ))}
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}