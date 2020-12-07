export let FragmentShader = `
    precision mediump float;

    varying vec3 vNormal;

    // Material.
    struct PhongMaterial {
        vec3 ka;
        vec3 kd;
        vec3 ks;
        float ke;
    };
    uniform PhongMaterial material;

    // Ambient light.
    uniform vec3 ambientLight;

    vec3 camLight(vec3 n) {

        vec3 ambient = material.ka * ambientLight;

        vec3 s = vec3(0,0,1);
        float sn = max( dot(s,n), 0.0);
        vec3 diffuse = material.kd * sn;

        return ambient + diffuse;
    }

    void main() {
        vec3 vNormal = normalize(vNormal);
        gl_FragColor = vec4(camLight(vNormal), 1.0);
    }
`