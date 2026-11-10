# Briefing para IA

Construa um projeto somente de consulta e leitura de CT-e autorizado. Primeiro defina a fonte dos XMLs ou banco; depois adapte `filtrarCtes` para o endpoint desejado.

- Chave de CT-e e chaves NF-e precisam ter exatamente 44 dígitos após normalização.
- A busca por número é auxiliar; não use-a como prova de vínculo fiscal.
- Guarde XMLs em storage privado e aplique controle de acesso por empresa.
- Não inclua certificado, token, URL privada, CNPJ real ou DACTE de produção no repositório.
