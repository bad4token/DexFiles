import React from "react";

import {
  Form,
  Typography,
  IPFSInput,
} from "web3uikit";

export const UploadFile = () => {
  return (
    <>
      <main>
        <section className=''>
          <Typography variant='h4'>
            <h2>Upload File</h2>
          </Typography>
        </section>
        <br />

        <IPFSInput
          onFinish={function noRefCheck(){}}
          theme="withIcon"
        />

        <Form
          buttonConfig={{
            onClick: function noRefCheck(){},
            theme: 'primary'
          }}
          data={[
            {
              inputWidth: '100%',
              name: 'title',
              type: 'text',
              value: ''
            },
            {
              inputWidth: '100%',
              name: 'Description',
              type: 'textarea',
              validation: {
                required: true
              },
              value: ''
            }
          ]}
          onSubmit={function noRefCheck(){}}
          title="Title"
        />

      </main>
    </>
  );
};
