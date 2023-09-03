export default async function myRoute(
    req,
    res
  ) {
    const doctors=[
        {
        name:`Dr.Suman Kumar`,
        contact:'9308319816',
        pfp:'',
        location :[ 86.16293743376855,23.6663994908232]
    },{
        name:`Dr. Laxmi Kumar`,
        contact:`9572272638`,
        location:[ -82.9071,40.4173]
    }
    ]
    res.send(doctors)
  }