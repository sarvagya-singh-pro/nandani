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
        name:`Dr. Mundrika Das`,
        contact:`7942697462`,
        location:[ 86.13664499757321,23.650773466542713]
    }
    ]
    res.send(doctors)
  }