export default async function myRoute(
    req,
    res
  ) {
    const doctors=[
        {
        name:`Dr.Suman Kumar`,
        contact:'9308319816',
        pfp:'',
        loaction :'sector 1c Pet Clinic'
    },{
        name:`Dr. Laxmi Kumar`,
        contact:`9572272638`,
    }
    ]
    res.send(doctors)
  }