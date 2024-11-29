const PARTS = [
    {limit:11294, taxe: 0},
    {limit:28797, taxe: 0.11},
    {limit:82341, taxe: 0.3},
    {limit:177106, taxe: 0.41},
    {limit:'+' , taxe: 0.45}
];
    
function Field ({name, label, value, onChange, help}) {
    return (
        <div className="form-group">
            <label className={"text-left"} htmlFor={name}><strong>{label}</strong></label>
            <div className="input-group">
                <input name={name} type="number" min="0" className="form-control" id={name} value={value} onChange={onChange}/>
                <div className="input-group-append">
                    <div className="input-group-text">€</div>
                </div>
            </div>
            <small className="form-text text-left text-muted">{help}</small>
        </div>
    )   
}

function Table ({parts, tranches}) {
    return (
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th scope="col">Tranche n°</th>
                    <th scope="col">Montant des revenus</th>
                    <th scope="col">Imposition</th>
                    <th scope="col">Impôt payé</th>
                </tr>
                </thead>
                <tbody>
                    {parts.map( function(part, index) {
                        return (
                            <Row 
                                key={index}
                                index={index+1} 
                                limit={ 
                                        ( (index === 0) ? numeral(0).format('0,0') + ' €' : numeral(parts[index-1].limit).format('€0,0') + ' €') + ' - ' + 
                                        ( (index === parts.length - 1) ? 'ou plus' : numeral(part.limit).format('0,0') + ' €' )
                                        } 
                                taxe={numeral(part.taxe).format('0%')} 
                                pay={numeral(tranches[index]).format('0,0.00')}
                            />
                        )
                    })}
                </tbody>
            </table>
    )   
}

function Row ({index, limit, taxe, pay}) {
    return (
        <tr>
            <td data-label="Tranche n°">{index}</td>
            <td data-label="Montant des revenus">{limit}</td>
            <td data-label="Imposition">{taxe}</td>
            <td data-label="Impôt payé">{pay + ' €'}</td>
        </tr>
    )
} 

class Home extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            gain: '',
            taxes : '',
            parts : 1,
            couple : false,
            childrens : 0,
            CMIchildrens : 0,
        }

        this.limit = PARTS.map( part => part.limit)
        this.percentage = PARTS.map( part => part.taxe)
        this.impots = 0; 
        this.gain = 0; 
        this.tranches = new Array(this.limit.length).fill(0);
    }

    calcTaxes = (gain) => {
       
        /* Init */
        this.impots = 0;
        this.gain = gain;
        this.tranches = new Array(this.limit.length).fill(0);
        let quotient = 1;

        /* Calcul quotien */
        if (this.state.couple) quotient ++;
      
        if (this.state.childrens > 0){
            let CMI = this.state.CMIchildrens * 0.5;
            if (this.state.childrens <= 2) 
              quotient = quotient + 0.5 * this.state.childrens + CMI;
            else 
              quotient = quotient + (this.state.childrens - 2) * 1 + 1 + CMI; 
        }
        
        /* Calcul impots */
        this.gain = this.gain / quotient;
        let impots = this.calc(1);

        /* Mise à jour */
        this.setState({
            parts:quotient,
            taxes: impots * quotient
        })
    }

    calc = (index = 1) => {

        if (this.gain <= this.limit[0]) return 0
      
        if (index != this.limit.length - 1 && this.gain > this.limit[index]) {
          let pay = (this.limit[index] - (this.limit[index-1] + 1)) * this.percentage[index];
          this.impots += pay;
          this.tranches[index] = pay;
          return this.calc(index+1) 
        }
        else {
          let pay = (this.gain - (this.limit[index-1] + 1)) * this.percentage[index];
          this.tranches[index] = pay;
          return this.impots += pay;
        }
    }

    handleChange = (e) => {

        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = e.target.name;

        this.setState(
            {[name]: value},
            () => this.calcTaxes(this.state.gain)
        )
    }

    render () {
        return (
            <React.Fragment>
                <div className="jumbotron bg-primary text-light text-center shadow rounded-O"> 
                    <h1>Simulateur impôt sur le revenu 2024</h1>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg mb-4">  
                            <div className="card shadow border-primary text-center">
                                <div className="card-header text-primary">
                                    <h5 className="mb-0">1. Je renseigne mes revenus</h5>
                                </div>
                                <div className="card-body">
                                    <Field 
                                        name={'gain'} 
                                        label={'Revenus net imposable'} 
                                        help={'Il s\'agit de vos revenus net imposables après l\'abattement forfaitaire ou réel'} 
                                        value={this.state.gain} 
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                        </div>  
                        <div className="col-lg">  
                            <div className="card shadow border-primary text-center">
                                <div className="card-header text-primary">
                                    <h5 className="mb-0">2. Je renseigne les caracterisques de mon foyer fiscal</h5>
                                </div>
                                <div className="card-body">
                                    <div className="form-check text-left">
                                        <input 
                                            name={'couple'} 
                                            className="form-check-input" 
                                            type="checkbox" 
                                            checked={this.state.couple}
                                            onChange={this.handleChange}
                                        />
                                        <label className="form-check-label" htmlFor="defaultCheck1">
                                            Je suis marié.e (ou pacsé.e)
                                        </label>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <Field 
                                                name={'childrens'} 
                                                label={'Mes enfants a charge'} 
                                                help={'Saisissez le nombre d\'enfants total à votre charge'} 
                                                value={this.state.childrens}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <Field 
                                                name={'CMIchildrens'} 
                                                label={'Mes enfants titulaires de la CMI'} 
                                                help={'Saisissez le nombre de vos enfants titulaires de la CMI parmi tous vos enfants à charge'} 
                                                value={this.state.CMIchildrens}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <div className="card shadow border-primary text-center">
                                <div className="card-header text-primary">
                                    <h5 className="mb-0">3. Je consulte le résultat de ma simulation</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-xl-6 col-lg-5">
                                            <div className="alert alert-primary">
                                                <p style={{fontSize:'20px'}}> 
                                                    <strong className="display-5">Impôt a payer : {numeral(this.state.taxes).format('0,0') + ' €'}</strong>
                                                </p>
                                                <hr/>
                                                <p>Quotient familial  : {this.state.parts}</p>
                                                <p>Revenus net imposable réel : {numeral(this.state.gain / this.state.parts).format('0,0') + ' €'}</p>
                                                <p>En pourcentage de votre salaire : {((this.state.gain === '' || this.state.gain === '0') ? 0 : (this.state.taxes / this.state.gain * 100).toFixed(2)) + '%' }</p>
                                                <hr/>
                                                <p style={{fontSize:'20px'}}> 
                                                    <strong>Revenus après impôts : {numeral(this.state.gain - Math.round(this.state.taxes)).format('0,0') + ' €'}</strong>
                                                </p>
                                            </div>
                                        </div> 
                                        <div className="col-xl-6 col-lg-7">
                                            <Table parts={PARTS} tranches={this.tranches}/>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
                <div className="text-center mt-4"> 
                    <p className={"text-muted"}>Réalisé par : <a className={"text-primary"} href="https://www.antonbourtnik.fr" target="_blank"><strong>Anton Bourtnik</strong></a> - Code source : <a href="https://github.com/abourtnik/simulator-taxes">Github</a></p>
                    <p className={"text-muted"}>Reponse au challenge : <a className={"text-primary"} href="https://github.com/Grafikart/Challenges/tree/master/JS/2-Impot.fr" target="_blank">Calculateur d'impôt sur le revenu</a> proposé par <a href="https://www.grafikart.fr" target="_blank">Grafikart</a> - Source du calcul : <a href="https://www.economie.gouv.fr/particuliers/tranches-imposition-impot-revenu#etapescalculir" target="_blank">www.economie.gouv.fr</a></p>
                </div>
            </React.Fragment>
        )
        
    }
}


ReactDOM.render(<Home/> , document.querySelector('#app'));
