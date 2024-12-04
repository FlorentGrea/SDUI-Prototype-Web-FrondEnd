interface SvgProps {
    [key: string]: string; // This allows for any additional props
}

export default function meetIcon(additionalProps: SvgProps = {}) {
    return {
        type: "Svg",
        props: {
            fill: "#000000",
            width: "800px",
            height: "800px",
            viewBox: "0 0 256 256",
            id: "Flat",
            d: "M203.668,67.34814a32.00043,32.00043,0,0,0-43.71289-11.71386,32.19022,32.19022,0,0,0-6.42481,4.87188l-14.5039-25.12091a31.99233,31.99233,0,0,0-52.39844-4.35614A32.00607,32.00607,0,0,0,40.96,73.5293l.50684.87756a32.0108,32.0108,0,0,0-19.14844,46.83533l42,72.74609a92.00041,92.00041,0,0,0,159.34961-92Zm6.00879,98.24024a68.00072,68.00072,0,0,1-124.57324,16.3999l-42-72.7456a8.00014,8.00014,0,0,1,13.856-8.00135L78.96,139.34766a12.05946,12.05946,0,0,0,.82324,1.22638c.08741.11627.17969.22625.271.3385q.33911.41793.70947.79852c.09717.10028.19238.20264.293.29895a11.92213,11.92213,0,0,0,1.06738.91931c.02637.0199.05518.036.08155.05567a11.96005,11.96005,0,0,0,1.09277.7149c.12256.07129.24658.13654.37109.20337q.457.24545.93164.44958c.12159.05243.24122.10791.36426.15625a12.05006,12.05006,0,0,0,1.312.43634c.04834.01288.09815.01966.14649.03193a12.06932,12.06932,0,0,0,1.21924.23834c.13867.02014.27783.03448.41748.04974q.51928.05667,1.043.06738c.08691.0019.17285.01679.25976.01679.042,0,.08447-.00769.12695-.00812a11.92964,11.92964,0,0,0,1.377-.08838c.05224-.00659.10351-.01977.15576-.0271a11.90776,11.90776,0,0,0,1.21728-.23828c.14112-.03509.28077-.077.4209-.11737q.49585-.14273.9834-.33075c.1333-.05133.26709-.09936.39942-.15582a11.88761,11.88761,0,0,0,7.28076-10.20087,11.94327,11.94327,0,0,0-1.57959-6.83526l-38.001-65.81885A7.9999,7.9999,0,0,1,75.60059,53.5293l34,58.89013a12.21111,12.21111,0,0,0,.667,1.03168,12.00069,12.00069,0,0,0,20.11816-13.03168l-26.00195-45.037a8,8,0,0,1,13.8584-7.99671l29.99756,51.95752.00244.0044,4.6914,8.126a52.05481,52.05481,0,0,0-9.333,63.83545,12.00023,12.00023,0,0,0,20.78515-12,28.00017,28.00017,0,0,1,10.249-38.24853,11.98182,11.98182,0,0,0,1.00976-.65338c.21826-.15686.42041-.32856.626-.49762.09668-.08.1997-.15259.29394-.23536.2544-.22375.49268-.46093.72461-.70269.03711-.03852.07813-.07306.11426-.11206.2373-.25342.45752-.51868.66943-.78937.02832-.03583.06006-.06854.08789-.10474.19971-.26086.38184-.532.5586-.80676.03515-.05451.07519-.10553.10937-.16071.16016-.25848.30274-.52581.44239-.79467.0415-.07911.08886-.15424.12841-.23432.13038-.26526.24268-.53808.35254-.81158.03614-.0896.08008-.17542.11426-.26605a12.07361,12.07361,0,0,0,.60693-2.26508c.01514-.09039.01954-.18127.03223-.27185.04248-.29761.08252-.59564.10254-.89624.00537-.07922.00147-.15839.00537-.23761.01465-.31268.02442-.62579.01465-.93994-.00147-.05231-.00928-.10419-.01172-.15644-.01514-.33868-.03955-.6773-.0835-1.01556-.00439-.03113-.01171-.06171-.01611-.09283-.04931-.3548-.11084-.70893-.19287-1.061-.00635-.02862-.01709-.0564-.02393-.085-.08349-.34888-.17919-.69623-.29589-1.04022-.02735-.08051-.064-.158-.09278-.2381-.10449-.28723-.21-.57422-.3374-.85638q-.24536-.54438-.54639-1.067L169.021,87.33673a7.99961,7.99961,0,0,1,13.86181-7.98907l20,34.64062A67.554,67.554,0,0,1,209.67676,165.58838ZM233.96191,63.39209A11.99453,11.99453,0,0,1,217.56934,59a48.19142,48.19142,0,0,0-41.58008-24.00977,12,12,0,0,1,.01074-24h.01074A72.26326,72.26326,0,0,1,238.35449,47,12.00026,12.00026,0,0,1,233.96191,63.39209ZM76.13477,247.70557a11.99863,11.99863,0,0,1-16.9043,1.49463,131.59687,131.59687,0,0,1-29.52832-35.21045,12.00023,12.00023,0,1,1,20.78515-12,107.6431,107.6431,0,0,0,24.15332,28.811A11.99954,11.99954,0,0,1,76.13477,247.70557Z",
            ...additionalProps
}}}