import React, { useState } from "react";

// Since react-bootstrap isn't installed, we'll use regular Bootstrap classes
const ApiTester = () => {
  const [apiKey, setApiKey] = useState("");
  const [prompt, setPrompt] = useState(
    "Berikan ide kerajinan dari botol plastik bekas."
  );
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const testOpenAI = async () => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const apiUrl = "/api/test-openai";
      console.log("Testing connection to API endpoint:", apiUrl);

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          apiKey: apiKey.trim() || undefined, // Only send if not empty
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponse(data);
      } else {
        setError(data.message || "Error saat menguji koneksi API");
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Penguji Koneksi API</h4>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">API Key (OpenAI)</label>
            <input
              type="text"
              className="form-control"
              placeholder="Masukkan API key OpenAI Anda di sini"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <div className="form-text text-muted">
              Biarkan kosong untuk menggunakan API key dari environment variable
              server.
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Prompt untuk Diuji</label>
            <textarea
              className="form-control"
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <button
            className="btn btn-primary"
            onClick={testOpenAI}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>{" "}
                Menguji...
              </>
            ) : (
              "Uji Koneksi OpenAI"
            )}
          </button>

          {error && (
            <div className="alert alert-danger mt-3">
              <h5>Error!</h5>
              <p>{error}</p>
            </div>
          )}

          {response && (
            <div className="mt-3">
              <div
                className={`alert ${
                  response.success ? "alert-success" : "alert-warning"
                }`}
              >
                <h5>
                  {response.success ? "Koneksi Berhasil!" : "Koneksi Gagal!"}
                </h5>
                <p>{response.message}</p>
                {response.usedKey && (
                  <p>
                    <strong>API key yang digunakan:</strong> {response.usedKey}
                  </p>
                )}
              </div>

              <div className="accordion mt-3" id="responseAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      Lihat Respons Lengkap
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#responseAccordion"
                  >
                    <div className="accordion-body">
                      <pre className="bg-light p-3 rounded">
                        {JSON.stringify(response, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiTester;
