import styles from '../styles/Home.module.css'
import {useState} from "react";



export default function Booth() {

    let [priceEconomAeroflot, setPriceEconomAeroflot] = useState(0);         // eco
    let [priceMediumAeroflot, setPriceMediumAeroflot] = useState(0);         // med
    let [priceLuksAeroflot, setPriceLuksAeroflot] = useState(0);             // lux

    let [weightBagage, setWeightBagage] = useState(0);

    let [priceEconomRZHD, setPriceEconomRZHD] = useState(0);                 // eco
    let [priceMediumRZHD, setPriceMediumRZHD] = useState(0);                 // med
    let [priceLuksRZHD, setPriceLuksRZHD] = useState(0);                     // lux


    const getDataOfForm = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = [...formData.values()];

        const dataOfForm = {
            kilometres: data[0],
            age: data[1],
            weight: data[2]
        }

        setWeightBagage(dataOfForm.weight);

        class AeroflotEconom {
            constructor(amountKM, amountWeight) {
             this.amountKM = amountKM;          
             this.amountWeight = amountWeight;       
             this.commissionEconom = 4;            
             this.commissionMedium = 8;
             this.commissionLuks = 15;    
            }

            calculateCommissionEconom(){           
                let summ = this.commissionEconom * this.amountKM;
                let weight = 0;
                
                if (this.amountWeight < 5){
                    weight = 0;
                } else if (this.amountWeight >= 5 && this.amountWeight <= 20){
                    weight = 4000;
                }
                setPriceEconomAeroflot(summ + weight);
            }
            
            calculateCommissionMedium(){           
                let summ = this.commissionMedium * this.amountKM;
                let kilometres = 0;
                let weight = 0;

                if (dataOfForm.age >= 7){
                    kilometres = summ;
                } else {
                    kilometres = summ - (summ * 0.3);
                } 

                if (this.amountWeight < 20){
                    weight = 0;
                } else if (this.amountWeight >= 20 && this.amountWeight <= 50){
                    weight = 5000;
                } 
                setPriceMediumAeroflot(kilometres + weight);
            }
            
            calculateCommissionLuks(){           
                let summ = this.commissionLuks * this.amountKM;
                let kilometres = 0;

                if (dataOfForm.age >= 16){
                    kilometres = summ;
                    setPriceLuksAeroflot(kilometres);
                } else {
                    kilometres = summ - (summ * 0.3);
                    setPriceLuksAeroflot(kilometres);
                }
            }
        }

        const app = new AeroflotEconom(dataOfForm.kilometres, dataOfForm.weight);

        app.calculateCommissionEconom();                      // Econom
        app.calculateCommissionMedium();                      // Medium
        app.calculateCommissionLuks();                        // Luks

        class RassianRailways {
            constructor(amountKM, amountWeight) {
             this.amountKM = amountKM;          
             this.amountWeight = amountWeight;       
             this.commissionEconom = 0.5;            
             this.commissionMedium = 2;
             this.commissionLuks = 4;    
            }

            calculateCommissionEconom(){           
                let summ = this.commissionEconom * this.amountKM;
                let kilometres = 0;
                let weight = 0;

                if (data[1] >= 5){
                    kilometres = summ;
                } else {
                    kilometres = summ * 0.5;
                }

                if (this.amountWeight < 15){
                    weight = 0;
                } else if (this.amountWeight >= 15 && this.amountWeight <= 50){
                    weight = this.amountWeight * 50;
                }
                setPriceEconomRZHD(kilometres + weight);
            }
            
            calculateCommissionMedium(){           
                let summ = this.commissionMedium * this.amountKM;
                let kilometres = 0;
                let weight = 0;

                if (dataOfForm.age >= 8){
                    kilometres = summ;
                } else {
                    kilometres = summ - (summ * 0.3);
                }

                if (this.amountWeight < 20){
                    weight = 0;
                } else if (this.amountWeight >= 20 && this.amountWeight <= 50){
                    weight = this.amountWeight * 50;
                }  
                setPriceMediumRZHD(kilometres + weight);
            }
                      
            calculateCommissionLuks(){           
                let summ = this.commissionLuks * this.amountKM;
                let kilometres = 0;

                if (dataOfForm.age >= 16){
                    kilometres = summ;
                    setPriceLuksRZHD(kilometres);
                } else {
                    kilometres = summ - (summ * 0.2);
                    setPriceLuksRZHD(kilometres);
                }
            }
        }

        const appRZHD = new RassianRailways(dataOfForm.kilometres, dataOfForm.weight);

        appRZHD.calculateCommissionEconom();                      // Econom
        appRZHD.calculateCommissionMedium();                      // Medium
        appRZHD.calculateCommissionLuks();                        // Luks

    }

    return (
        <>
            <div className={styles.booth_box}>
                <form className={styles.flex_column} onSubmit={getDataOfForm}>
                        <div className={styles.flex_row}>
                            <lable className={styles.lable}>Количество километров</lable>
                            <input name="input_km" className={styles.input} type="text" placeholder="Введите расстояние"/>
                        </div>
                        <div className={styles.flex_row}>
                            <lable className={styles.lable}>Возраст</lable>
                            <input name="input_age" className={styles.input} type="text" placeholder="Введите возраст"/>
                        </div>
                        <div className={styles.flex_row}>
                            <lable className={styles.lable}>Вес багажа</lable>
                            <input name="input_ves" className={styles.input} type="text" placeholder="Введите вес багажа"/>
                        </div>
                        <button type="submit" className={styles.button}>Рассчитать</button>
                </form>
                <div className={styles.flex_column}>
                    <div>
                        <p className={styles.company}>Аэрофлот</p>
                        { weightBagage <= 20 ? <p className={styles.text_list}> Эконом: { priceEconomAeroflot } ₽</p> : null }
                        { weightBagage <= 50 ? <p className={styles.text_list}> Продвинутый: { priceMediumAeroflot } ₽</p> : null }
                        { weightBagage <= 50 ? <p className={styles.text_list}> Люкс: { priceLuksAeroflot } ₽</p> : null }
                    </div>
                    <div>
                        <p className={styles.company}>РЖД</p>
                        { weightBagage <= 50 ? <p className={styles.text_list}> Эконом: { priceEconomRZHD } ₽</p> : null }
                        { weightBagage <= 60 ? <p className={styles.text_list}> Продвинутый: { priceMediumRZHD } ₽</p> : null }
                        { weightBagage <= 60 ? <p className={styles.text_list}> Люкс: { priceLuksRZHD } ₽</p> : null }
                    </div>
                </div>
            </div>
        </>
    )

}