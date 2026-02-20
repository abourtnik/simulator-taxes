import {Card, Input, Select, Table} from '@/components/ui'
import {Header, Hero, Footer} from '@/components'
import {useTax} from "@/hooks/useTax";
import {PARTS} from '@/config'
import numeral from 'numeral'
import {enumToOptions} from "@/functions/string";
import {Situation} from "@/types";

function App() {

    const {
        tax,
        handleChange,
        quotient,
        netTaxableIncome,
        taxToPay,
        percentageOfSalary,
        afterTaxIncome,
        taxPerBracket,
    } = useTax();

    const tableData = PARTS.map((part, index) => ([
        index + 1,
        `${numeral(part.lowerLimit).format('0,0')} € - ${numeral(part.upperLimit).format('0,0')} €`,
        `${part.tax * 100}%`,
        `${numeral(taxPerBracket[index] ?? 0).format('0,0')} €`
    ]))

    return (
        <>
           <Header/>
           <Hero/>
            <section className={'mx-0 sm:mx-3 lg:mx-10 my-5 sm:my-5 lg:my-10'}>
                <section className={'flex flex-col md:flex-row gap-5'}>
                    <section className={'w-full md:w-2/5'}>
                        <Card title="1. Je renseigne mes informations personnelles">
                            <div className={'flex flex-col gap-8'}>
                                <Input
                                    name={'gain'}
                                    label={'Revenus net imposable'}
                                    help={'Il s\'agit de vos revenus net imposables après l\'abattement forfaitaire ou réel'}
                                    value={tax.gain}
                                    onChange={handleChange}
                                />
                                <Select
                                    name={'situation'}
                                    label={'Votre situation familiale'}
                                    options={enumToOptions(Situation)}
                                    onChange={handleChange}
                                />
                                <div className={'flex flex-col xl:flex-row gap-3'}>
                                    <Input
                                        name={'children'}
                                        label={'Mes enfants a charge'}
                                        value={tax.children}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        name={'CMIChildren'}
                                        label={'Mes enfants handicapé à charge'}
                                        help={'Saisissez le nombre de vos enfants handicapé parmi tous vos enfants à charge'}
                                        value={tax.CMIChildren}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </Card>
                    </section>
                    <section className={'w-full md:w-3/5'}>
                        <Card title="2. Je consulte le résultat de ma simulation">
                            <div className={'flex flex-col gap-4'}>
                                <div className={'flex flex-col text-left bg-gray-100 p-3 border border-gray-300 w-full'}>
                                    <div className={'font-bold text-xl'}>Impôt a payer : {numeral(taxToPay).format('0,0')} €</div>
                                    <hr className={'my-3 border-black'}/>
                                    <div className={'flex flex-col gap-2'}>
                                        <div>Quotient familial : {quotient}</div>
                                        <div>Revenus net imposable réel : {numeral(netTaxableIncome).format('0,0')} €</div>
                                        <div>En pourcentage de votre salaire : {percentageOfSalary}%</div>
                                    </div>
                                    <hr className={'my-3 border-black'}/>
                                    <div className={'font-bold text-xl'}>Revenus après impôts : {numeral(afterTaxIncome).format('0,0')} €</div>
                                </div>
                                <h3 className={'text-lg font-bold py-3 text-black'}>Detail par tranche d&apos;imposition</h3>
                                <Table
                                    columns={['Tranche n°', 'Montant des revenus', 'Imposition', 'Impôt payé']}
                                    data={tableData}
                                />
                            </div>
                        </Card>
                    </section>
                </section>
            </section>
           <Footer/>
        </>
    )
}

export default App
